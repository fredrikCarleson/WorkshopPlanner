import React, { useState, useEffect } from 'react';
import { WorkshopForm } from './components/WorkshopForm';
import { WorkshopSchedule } from './components/WorkshopSchedule';
import { StructureLibrary } from './components/StructureLibrary';
import { WorkshopLibrary } from './components/WorkshopLibrary';
import { NarrativeArc } from './components/NarrativeArc';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AutoSaveIndicator } from './components/AutoSaveIndicator';
import { Workshop, FormData, SavedWorkshop } from './types/Workshop';
import { generateWorkshopId, generateStableWorkshopId, generateOrLoadWorkshopSessions } from './utils/workshopCalculator';
import { liberatingStructures } from './data/liberatingStructures';
import { 
  saveWorkshop, 
  autoSaveFormData, 
  loadAutoSavedFormData,
  getWorkshopById,
  updateWorkshop,
  cleanupDuplicateWorkshops,
  migrateDataFromOtherPorts,
  backupDataForPortChange
} from './utils/workshopManager';
import { saveWorkshopSessions } from './utils/workshopStorage';

// Helper functions for time calculations
const timeStringToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

const calculateAbsoluteTimes = (startTime: string, relativeStartMinutes: number, duration: number): { startTime: string; endTime: string } => {
  const workshopStartMinutes = timeStringToMinutes(startTime);
  const absoluteStartMinutes = workshopStartMinutes + relativeStartMinutes;
  const absoluteEndMinutes = absoluteStartMinutes + duration;
  
  const minutesToTimeString = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };
  
  return {
    startTime: minutesToTimeString(absoluteStartMinutes),
    endTime: minutesToTimeString(absoluteEndMinutes)
  };
};

function App() {
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentWorkshopId, setCurrentWorkshopId] = useState<string | null>(null);
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(false);
  const [isLoadingSavedWorkshop, setIsLoadingSavedWorkshop] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [formData, setFormData] = useState<FormData>({
    hours: 4,
    participants: 12,
    purposes: [],
    context: '',
    goals: '',
    startTime: '09:00'
  });

  // Load saved data on component mount
  useEffect(() => {
    // Migrate data from other ports if needed
    migrateDataFromOtherPorts();
    // Clean up any duplicate workshops first
    cleanupDuplicateWorkshops();
    loadInitialData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Backup data before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      backupDataForPortChange();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
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
    setIsLoadingSavedWorkshop(true);
    setCurrentWorkshopId(id); // Set this immediately to prevent live preview
    const savedWorkshop = getWorkshopById(id);
    if (savedWorkshop) {
      if (savedWorkshop.formData) {
        setFormData(savedWorkshop.formData);
      }
      if (savedWorkshop.workshop) {
        setWorkshop(savedWorkshop.workshop);
      }
    }
    // Reset the flag after a longer delay to ensure workshop is fully loaded
    setTimeout(() => setIsLoadingSavedWorkshop(false), 2000);
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

  // Live preview - regenerate workshop when form data changes
  useEffect(() => {
    // Generate live preview if we have context and goals, and we're not currently loading
    // AND we don't have a current workshop ID (meaning this is a new workshop, not a loaded one)
    if (formData.context.trim() && formData.goals.trim() && !loading && !isLoadingSavedWorkshop && !currentWorkshopId) {
      const timeoutId = setTimeout(() => {
        // Generate a stable workshop ID based on current parameters (for live preview)
        const workshopId = generateStableWorkshopId(
          formData.hours, 
          formData.participants, 
          formData.purposes, 
          formData.context, 
          formData.goals, 
          formData.startTime
        );
        
        // Generate or load sessions based on the workshop ID
        const sessions = generateOrLoadWorkshopSessions(
          workshopId,
          formData.hours, 
          formData.participants, 
          formData.purposes, 
          formData.context, 
          formData.goals, 
          formData.startTime
        );
        
        // Create workshop object with loaded/generated sessions
        const newWorkshop: Workshop = {
          id: workshopId,
          title: `Workshop ${formData.hours}h - ${formData.participants} deltagare`,
          duration: formData.hours,
          participants: formData.participants,
          purposes: formData.purposes,
          context: formData.context,
          goals: formData.goals,
          sessions,
          totalTime: sessions.reduce((total, session) => total + session.duration, 0),
          startTime: formData.startTime
        };
        
        setWorkshop(newWorkshop);
      }, 500); // Small delay to prevent too frequent regenerations

      return () => clearTimeout(timeoutId);
    }
  }, [formData.context, formData.goals, formData.participants, formData.startTime, formData.hours, formData.purposes, loading, isLoadingSavedWorkshop, currentWorkshopId]);

  // Auto-save workshop when it changes (for new workshops)
  useEffect(() => {
    if (workshop && !currentWorkshopId && !isLoadingSavedWorkshop && formData.context.trim() && formData.goals.trim()) {
      setIsAutoSaving(true);
      const timeoutId = setTimeout(() => {
        const savedWorkshop = saveWorkshop(workshop, formData);
        setCurrentWorkshopId(savedWorkshop.id);
        
        // Update URL to include workshop ID
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('workshop', savedWorkshop.id);
        window.history.replaceState({}, '', newUrl.toString());
        
        setIsAutoSaving(false);
        setLastSaved(new Date());
      }, 2000); // Save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [workshop, currentWorkshopId, formData, isLoadingSavedWorkshop]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update saved workshop when form data changes (for existing workshops)
  useEffect(() => {
    if (currentWorkshopId && workshop && !isLoadingSavedWorkshop) {
      setIsAutoSaving(true);
      const timeoutId = setTimeout(() => {
        // Update the workshop with new form data but keep the same sessions
        const updatedWorkshop = {
          ...workshop,
          title: `Workshop ${formData.hours}h - ${formData.participants} deltagare`,
          duration: formData.hours,
          participants: formData.participants,
          purposes: formData.purposes,
          context: formData.context,
          goals: formData.goals,
          startTime: formData.startTime
        };
        
        updateWorkshop(currentWorkshopId, { 
          workshop: updatedWorkshop, 
          formData, 
          status: 'completed',
          lastModified: new Date()
        });
        
        setWorkshop(updatedWorkshop);
        setIsAutoSaving(false);
        setLastSaved(new Date());
      }, 2000); // Save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [formData.context, formData.goals, formData.participants, formData.startTime, formData.hours, formData.purposes, currentWorkshopId, workshop, isLoadingSavedWorkshop]);

  const handleRegenerate = () => {
    setLoading(true);
    
    // Clear current workshop ID since we're creating a new workshop
    setCurrentWorkshopId(null);
    
    // Generate a completely new workshop with current form data
    setTimeout(() => {
      // Generate a new workshop ID (this will be different due to timestamp)
      const newWorkshopId = generateWorkshopId(
        formData.hours, 
        formData.participants, 
        formData.purposes, 
        formData.context, 
        formData.goals, 
        formData.startTime
      );
      
      // Generate new sessions (this will create new ones since the ID is different)
      const newSessions = generateOrLoadWorkshopSessions(
        newWorkshopId,
        formData.hours, 
        formData.participants, 
        formData.purposes, 
        formData.context, 
        formData.goals, 
        formData.startTime
      );
      
      // Create new workshop object
      const newWorkshop: Workshop = {
        id: newWorkshopId,
        title: `Workshop ${formData.hours}h - ${formData.participants} deltagare`,
        duration: formData.hours,
        participants: formData.participants,
        purposes: formData.purposes,
        context: formData.context,
        goals: formData.goals,
        sessions: newSessions,
        totalTime: newSessions.reduce((total, session) => total + session.duration, 0),
        startTime: formData.startTime
      };
      
      setWorkshop(newWorkshop);
      setLoading(false);
      
      // Clear URL parameter since this is a new workshop
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('workshop');
      window.history.replaceState({}, '', newUrl.toString());
    }, 800);
  };

  const handleReplaceActivity = (sessionIndex: number, newStructureId: string) => {
    if (!workshop) return;
    
    // Find the new structure
    const newStructure = liberatingStructures.find(s => s.id === newStructureId);
    if (!newStructure) return;
    
    // Calculate new duration for the new structure
    const baseDuration = newStructure.baseTime + (newStructure.scalingFactor * formData.participants);
    const newDuration = Math.ceil(baseDuration / 5) * 5;
    
    // Create a copy of the workshop sessions
    const updatedSessions = [...workshop.sessions];
    const oldSession = updatedSessions[sessionIndex];
    
    // Update the session with new structure and duration
    updatedSessions[sessionIndex] = {
      ...oldSession,
      structure: newStructure,
      duration: newDuration
    };
    
    // Recalculate times for all subsequent sessions
    let currentTime = timeStringToMinutes(workshop.startTime);
    for (let i = 0; i < updatedSessions.length; i++) {
      const session = updatedSessions[i];
      const sessionTimes = calculateAbsoluteTimes(workshop.startTime, currentTime, session.duration);
      updatedSessions[i] = {
        ...session,
        startTime: sessionTimes.startTime,
        endTime: sessionTimes.endTime
      };
      currentTime += session.duration;
    }
    
    // Create updated workshop
    const updatedWorkshop = {
      ...workshop,
      sessions: updatedSessions,
      totalTime: currentTime - timeStringToMinutes(workshop.startTime)
    };
    
    setWorkshop(updatedWorkshop);
    
    // Auto-save the change if we have a current workshop ID
    if (currentWorkshopId) {
      setIsAutoSaving(true);
      updateWorkshop(currentWorkshopId, { 
        workshop: updatedWorkshop, 
        formData, 
        status: 'completed',
        lastModified: new Date()
      });
      
      // Also save the updated sessions
      saveWorkshopSessions(currentWorkshopId, updatedSessions);
      
      setIsAutoSaving(false);
      setLastSaved(new Date());
    }
  };

  const handleEditActivity = (sessionIndex: number, customData: any, newDuration?: number) => {
    if (!workshop) return;
    
    // Create a copy of the workshop sessions
    const updatedSessions = [...workshop.sessions];
    const session = updatedSessions[sessionIndex];
    
    // Update the session with custom data
    updatedSessions[sessionIndex] = {
      ...session,
      customData,
      isCustomized: true,
      duration: newDuration || session.duration
    };
    
    // If duration changed, recalculate times for all subsequent sessions
    if (newDuration && newDuration !== session.duration) {
      let currentTime = timeStringToMinutes(workshop.startTime);
      for (let i = 0; i < updatedSessions.length; i++) {
        const sessionToUpdate = updatedSessions[i];
        const sessionTimes = calculateAbsoluteTimes(workshop.startTime, currentTime, sessionToUpdate.duration);
        updatedSessions[i] = {
          ...sessionToUpdate,
          startTime: sessionTimes.startTime,
          endTime: sessionTimes.endTime
        };
        currentTime += sessionToUpdate.duration;
      }
    }
    
    // Create updated workshop
    const updatedWorkshop = {
      ...workshop,
      sessions: updatedSessions,
      totalTime: updatedSessions.reduce((total, s) => total + s.duration, 0)
    };
    
    setWorkshop(updatedWorkshop);
    
    // Auto-save the change if we have a current workshop ID
    if (currentWorkshopId) {
      setIsAutoSaving(true);
      updateWorkshop(currentWorkshopId, { 
        workshop: updatedWorkshop, 
        formData, 
        status: 'completed',
        lastModified: new Date()
      });
      
      // Also save the updated sessions
      saveWorkshopSessions(currentWorkshopId, updatedSessions);
      
      setIsAutoSaving(false);
      setLastSaved(new Date());
    }
  };

  const handleFormDataChange = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleLoadWorkshop = (savedWorkshop: SavedWorkshop) => {
    setIsLoadingSavedWorkshop(true);
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
    
    // Reset the flag after a longer delay to ensure workshop is fully loaded
    setTimeout(() => setIsLoadingSavedWorkshop(false), 2000);
  };

  const handleNewWorkshop = () => {
    setCurrentWorkshopId(null);
    setWorkshop(null);
    setFormData({
      hours: 4,
      participants: 12,
      purposes: [],
      context: '',
      goals: '',
      startTime: '09:00'
    });
    
    // Clear URL parameters
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('workshop');
    window.history.replaceState({}, '', newUrl.toString());
  };

  return (
    <ErrorBoundary>
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
                onRegenerate={handleRegenerate}
                formData={formData}
                onFormDataChange={handleFormDataChange}
                loading={loading}
                hasWorkshop={!!workshop}
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
                  onReplaceActivity={handleReplaceActivity}
                  onEditActivity={handleEditActivity}
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
                    Fyll i formuläret till vänster för att se förhandsvisningen av workshoppen.
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
         
         {/* Auto-save indicator */}
         <AutoSaveIndicator isSaving={isAutoSaving} lastSaved={lastSaved} />
       </div>
    </ErrorBoundary>
  );
}

export default App;