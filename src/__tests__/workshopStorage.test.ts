import { saveWorkshopSessions, loadWorkshopSessions, deleteWorkshopSessions, hasWorkshopSessions } from '../utils/workshopStorage';
import { WorkshopSession } from '../types/Workshop';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Workshop Storage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.length = 0;
  });

  const mockSessions: WorkshopSession[] = [
    {
      id: 'session-0',
      structure: {
        id: 'welcome',
        name: 'Välkommen',
        category: 'Foundation',
        baseTime: 15,
        scalingFactor: 0,
        minParticipants: 1,
        maxParticipants: 1000,
        description: 'Welcome activity',
        instructions: 'Welcome instructions',
        icon: '👋'
      },
      duration: 15,
      startTime: '09:00',
      endTime: '09:15',
      purpose: 'Welcome purpose',
      output: 'Welcome output',
      transition: '',
      phase: 'Open',
      risks: 'No risks',
      mitigation: 'No mitigation needed'
    }
  ];

  test('should save workshop sessions', () => {
    const workshopId = 'test-workshop-123';
    
    saveWorkshopSessions(workshopId, mockSessions);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'workshop_sessions_test-workshop-123',
      JSON.stringify(mockSessions)
    );
  });

  test('should load workshop sessions', () => {
    const workshopId = 'test-workshop-123';
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSessions));
    
    const loadedSessions = loadWorkshopSessions(workshopId);
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('workshop_sessions_test-workshop-123');
    expect(loadedSessions).toEqual(mockSessions);
  });

  test('should return null when no sessions exist', () => {
    const workshopId = 'test-workshop-123';
    localStorageMock.getItem.mockReturnValue(null);
    
    const loadedSessions = loadWorkshopSessions(workshopId);
    
    expect(loadedSessions).toBeNull();
  });

  test('should delete workshop sessions', () => {
    const workshopId = 'test-workshop-123';
    
    deleteWorkshopSessions(workshopId);
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('workshop_sessions_test-workshop-123');
  });

  test('should check if workshop sessions exist', () => {
    const workshopId = 'test-workshop-123';
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSessions));
    
    const exists = hasWorkshopSessions(workshopId);
    
    expect(exists).toBe(true);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('workshop_sessions_test-workshop-123');
  });

  test('should return false when workshop sessions do not exist', () => {
    const workshopId = 'test-workshop-123';
    localStorageMock.getItem.mockReturnValue(null);
    
    const exists = hasWorkshopSessions(workshopId);
    
    expect(exists).toBe(false);
  });
});
