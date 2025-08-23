import React, { useState, useEffect, useCallback } from 'react';
import { WorkshopForm } from './components/WorkshopForm';
import { WorkshopSchedule } from './components/WorkshopSchedule';
import { StructureLibrary } from './components/StructureLibrary';
import { WorkshopLibrary } from './components/WorkshopLibrary';
import { NarrativeArc } from './components/NarrativeArc';
import { Workshop, FormData, SavedWorkshop } from './types/Workshop';
import { generateWorkshop } from './utils/workshopCalculator';
import { 
  saveWorkshop, 
  saveDraft, 
  autoSaveFormData, 
  loadAutoSavedFormData,
  getWorkshopById,
  updateWorkshop,
  cleanupDuplicateWorkshops
} from './utils/workshopManager';

function App() {
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentWorkshopId, setCurrentWorkshopId] = useState<string | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    hours: 4,
    participants: 12,
    purposes: [],
    context: '',
    goals: ''
  });

  // Load saved data on component mount
  useEffect(() => {
    // Clean up any duplicate workshops first
    cleanupDuplicateWorkshops();
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
      // Only save as new workshop if we don't have a current workshop ID
      // or if this is a completely new workshop (not just a regeneration)
      if (!currentWorkshopId) {
        const savedWorkshop = saveWorkshop(workshop, formData);
        setCurrentWorkshopId(savedWorkshop.id);
        
        // Update URL to include workshop ID
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('workshop', savedWorkshop.id);
        window.history.replaceState({}, '', newUrl.toString());
      } else {
        // Update existing workshop instead of creating a new one
        updateWorkshop(currentWorkshopId, { 
          workshop, 
          formData, 
          status: 'completed',
          lastModified: new Date()
        });
      }
    }
  }, [workshop, loading, currentWorkshopId, formData]);

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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Two-pane layout */}
        <div className="grid lg:grid-cols-5 gap-8 mb-8">
          {/* Left Pane - Admin/Setup (2/5 width) */}
          <div className="lg:col-span-2 space-y-6">
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
          </div>

          {/* Right Pane - Workshop Output (3/5 width) */}
          <div className="lg:col-span-3">
            <NarrativeArc />
            
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

            {!workshop && !loading && (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen workshop genererad än</h3>
                <p className="text-gray-600">
                  Fyll i formuläret till vänster och klicka "Generera Workshop" för att komma igång.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Structure Library */}
        <div className="no-print">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setIsLibraryExpanded(!isLibraryExpanded)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <h2 className="text-xl font-bold text-gray-900">Liberating Structures-bibliotek</h2>
              <svg 
                className={`w-5 h-5 text-gray-600 transition-transform ${isLibraryExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isLibraryExpanded && (
              <div className="p-6">
                <StructureLibrary />
              </div>
            )}
          </div>
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