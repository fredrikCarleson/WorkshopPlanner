import React, { useState } from 'react';
import { WorkshopForm } from './components/WorkshopForm';
import { WorkshopSchedule } from './components/WorkshopSchedule';
import { StructureLibrary } from './components/StructureLibrary';
import { Workshop } from './types/Workshop';
import { generateWorkshop } from './utils/workshopCalculator';

interface FormData {
  hours: number;
  participants: number;
  purposes: string[];
  context: string;
  goals: string;
}

function App() {
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    hours: 4,
    participants: 12,
    purposes: [],
    context: '',
    goals: ''
  });

  const handleGenerateWorkshop = () => {
    setLoading(true);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      const newWorkshop = generateWorkshop(formData.hours, formData.participants, formData.purposes, formData.context, formData.goals);
      setWorkshop(newWorkshop);
      setLoading(false);
    }, 800);
  };

  const handleRegenerate = () => {
    handleGenerateWorkshop();
  };

  const handleFormDataChange = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <WorkshopForm 
          onGenerate={handleGenerateWorkshop} 
          formData={formData}
          onFormDataChange={handleFormDataChange}
          loading={loading}
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
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [workshop, formData]);

export default App;
  )
}