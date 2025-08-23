import React, { useState, useEffect, useCallback } from 'react';
import { WorkshopForm } from './components/WorkshopForm';
import { WorkshopSchedule } from './components/WorkshopSchedule';
import { StructureLibrary } from './components/StructureLibrary';
import { WorkshopLibrary } from './components/WorkshopLibrary';
import { Workshop, FormData, SavedWorkshop } from './types/Workshop';
import { generateWorkshop } from './utils/workshopCalculator';
import { 
  saveWorkshop, 
  saveDraft, 
  autoSaveFormData, 
  loadAutoSavedFormData,
  getWorkshopById,
  updateWorkshop
} from './utils/workshopManager';

function App() {
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentWorkshopId, setCurrentWorkshopId] = useState<string | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [formData, setFormData] = useState<FormData>({
    hours: 4,
    participants: 12,
    purposes: [],
    context: '',
    goals: ''
  });

  // Load saved data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    // Check if we're loading a specific workshop from URL
    const urlParams = new URLSearchParams(window.location.search);
    const workshopId = urlParams.get('workshop');
    
    if (workshopId) {
      loadWorkshopById(workshopId);
    } else {
      // Load auto-saved form data or default data
      const autoSavedData = loadAutoSavedFormData();
      if (autoSavedData) {
        setFormData(autoSavedData);
      }
      
      // Load the last generated workshop
      const savedWorkshop = localStorage.getItem('workshop');
      if (savedWorkshop) {
        setWorkshop(JSON.parse(savedWorkshop));
      }
    }
  };

  const loadWorkshopById = (id: string) => {
    const savedWorkshop = getWorkshopById(id);
    if (savedWorkshop) {
      setCurrentWorkshopId(id);
      if (savedWorkshop.formData) {
        setFormData(savedWorkshop.formData);
      }
      if (savedWorkshop.workshop) {
        setWorkshop(savedWorkshop.workshop);
      }
    }
  };

  // Auto-save form data with debouncing
  useEffect(() => {
    setIsAutoSaving(true);
    const timeoutId = setTimeout(() => {
      autoSaveFormData(formData);
      setIsAutoSaving(false);
      setLastSaved(new Date());
    }, 2000); // Save after 2 seconds of inactivity

    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Save workshop when it's generated
  useEffect(() => {
    if (workshop && !loading) {
      const savedWorkshop = saveWorkshop(workshop, formData);
      setCurrentWorkshopId(savedWorkshop.id);
      
      // Update URL to include workshop ID
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('workshop', savedWorkshop.id);
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [workshop, loading]);

  const handleGenerateWorkshop = () => {
    setLoading(true);
    
    // Save current form as draft
    if (currentWorkshopId) {
      updateWorkshop(currentWorkshopId, { formData, status: 'draft' });
    } else {
      saveDraft(formData);
    }
    
    // Add a small delay to show loading state
    setTimeout(() => {
      const newWorkshop = generateWorkshop(formData.hours, formData.participants, formData.purposes, formData.context, formData.goals);
      setWorkshop(newWorkshop);
      setLoading(false);
    }, 800);
  };

  const handleRegenerate = () => {
    // Only regenerate, don't clear form data
    handleGenerateWorkshop();
  };

  const handleFormDataChange = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleLoadWorkshop = (savedWorkshop: SavedWorkshop) => {
    setCurrentWorkshopId(savedWorkshop.id);
    if (savedWorkshop.formData) {
      setFormData(savedWorkshop.formData);
    }
    if (savedWorkshop.workshop) {
      setWorkshop(savedWorkshop.workshop);
    }
    
    // Update URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('workshop', savedWorkshop.id);
    window.history.replaceState({}, '', newUrl.toString());
  };

  const handleNewWorkshop = () => {
    setCurrentWorkshopId(null);
    setWorkshop(null);
    setFormData({
      hours: 4,
      participants: 12,
      purposes: [],
      context: '',
      goals: ''
    });
    
    // Clear URL parameters
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('workshop');
    window.history.replaceState({}, '', newUrl.toString());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <WorkshopLibrary 
          onLoadWorkshop={handleLoadWorkshop}
          onNewWorkshop={handleNewWorkshop}
        />
        
        <WorkshopForm 
          onGenerate={handleGenerateWorkshop} 
          formData={formData}
          onFormDataChange={handleFormDataChange}
          loading={loading}
          isAutoSaving={isAutoSaving}
          lastSaved={lastSaved}
        />
        
        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Genererar din workshop...</p>
          </div>
        )}
        
        {workshop && !loading && (
          <WorkshopSchedule 
            workshop={workshop} 
            onRegenerate={handleRegenerate}
          />
        )}
        
        <div className="no-print">
          <StructureLibrary />
        </div>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Baserat på{' '}
            <a 
              href="https://www.liberatingstructures.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Liberating Structures
            </a>
           </p>
         </footer>
       </div>
     </div>
   );
}

export default App;