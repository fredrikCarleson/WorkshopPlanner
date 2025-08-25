import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the workshop manager functions
jest.mock('../utils/workshopManager', () => ({
  saveWorkshop: jest.fn(),
  saveDraft: jest.fn(),
  autoSaveFormData: jest.fn(),
  loadAutoSavedFormData: jest.fn(() => null),
  getWorkshopById: jest.fn(() => null),
  updateWorkshop: jest.fn(),
  cleanupDuplicateWorkshops: jest.fn(),
  migrateDataFromOtherPorts: jest.fn(),
  backupDataForPortChange: jest.fn(),
  getSavedWorkshops: jest.fn(() => []),
}));

// Mock react-markdown
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }: { children: React.ReactNode }) {
    return <div data-testid="markdown">{children}</div>;
  };
});

// Mock jspdf and html2canvas
jest.mock('jspdf', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
    addPage: jest.fn(),
    text: jest.fn(),
    setFontSize: jest.fn(),
    setFont: jest.fn(),
  })),
}));

jest.mock('html2canvas', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    toDataURL: jest.fn().mockReturnValue('data:image/png;base64,mock'),
  }),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('should render workshop form and empty state initially', () => {
    render(<App />);
    
    expect(screen.getByText('Workshop planerare')).toBeInTheDocument();
    expect(screen.getByText('Ingen workshop genererad än')).toBeInTheDocument();
  });

  test('should generate workshop when context and goals are filled', async () => {
    render(<App />);
    
    // Fill in required fields
    const contextInput = screen.getByLabelText(/Workshopens syfte och kontext/i);
    const goalsInput = screen.getByLabelText(/Konkreta mål för workshoppen/i);
    
    fireEvent.change(contextInput, { target: { value: 'Test context' } });
    fireEvent.change(goalsInput, { target: { value: 'Test goals' } });
    
    // Wait for live preview to trigger
    await waitFor(() => {
      expect(screen.queryByText('Ingen workshop genererad än')).not.toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Should show workshop schedule
    expect(screen.getByText(/Workshop \d+h - \d+ deltagare/)).toBeInTheDocument();
  });

  test('should show loading state when regenerating', async () => {
    render(<App />);
    
    // Fill in required fields to generate initial workshop
    const contextInput = screen.getByLabelText(/Workshopens syfte och kontext/i);
    const goalsInput = screen.getByLabelText(/Konkreta mål för workshoppen/i);
    
    fireEvent.change(contextInput, { target: { value: 'Test context' } });
    fireEvent.change(goalsInput, { target: { value: 'Test goals' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Ingen workshop genererad än')).not.toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Click regenerate button
    const regenerateButton = screen.getByText('Regenerera övningar');
    fireEvent.click(regenerateButton);
    
    // Should show loading state
    expect(screen.getByText('Genererar din workshop...')).toBeInTheDocument();
  });

  test('should auto-save workshop when form data changes', async () => {
    const { saveWorkshop } = require('../utils/workshopManager');
    saveWorkshop.mockReturnValue({ id: 'test-workshop-id' });
    
    render(<App />);
    
    // Fill in required fields
    const contextInput = screen.getByLabelText(/Workshopens syfte och kontext/i);
    const goalsInput = screen.getByLabelText(/Konkreta mål för workshoppen/i);
    
    fireEvent.change(contextInput, { target: { value: 'Test context' } });
    fireEvent.change(goalsInput, { target: { value: 'Test goals' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Ingen workshop genererad än')).not.toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Wait for auto-save to trigger
    await waitFor(() => {
      expect(saveWorkshop).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  test('should update form data when inputs change', () => {
    render(<App />);
    
    const contextInput = screen.getByLabelText(/Workshopens syfte och kontext/i);
    const goalsInput = screen.getByLabelText(/Konkreta mål för workshoppen/i);
    const participantsInput = screen.getByLabelText(/Antal deltagare/i);
    
    fireEvent.change(contextInput, { target: { value: 'New context' } });
    fireEvent.change(goalsInput, { target: { value: 'New goals' } });
    fireEvent.change(participantsInput, { target: { value: '15' } });
    
    expect(contextInput).toHaveValue('New context');
    expect(goalsInput).toHaveValue('New goals');
    expect(participantsInput).toHaveValue(15);
  });

  test('should handle new workshop creation', () => {
    render(<App />);
    
    // Fill in some data first
    const contextInput = screen.getByLabelText(/Workshopens syfte och kontext/i);
    fireEvent.change(contextInput, { target: { value: 'Test context' } });
    
    // Click new workshop button (if it exists)
    const newWorkshopButton = screen.getByText('Ny workshop');
    if (newWorkshopButton) {
      fireEvent.click(newWorkshopButton);
      
      // Should clear the form
      expect(contextInput).toHaveValue('');
    }
  });
});
