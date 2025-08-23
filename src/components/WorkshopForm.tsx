import React, { useState } from 'react';
import { Clock, Users, Play, FileText } from 'lucide-react';
import { PurposeSelector } from './PurposeSelector';
import { AutoSaveIndicator } from './AutoSaveIndicator';

interface WorkshopFormProps {
  onGenerate: () => void;
  formData: {
    hours: number;
    participants: number;
    purposes: string[];
    context: string;
    goals: string;
  };
  onFormDataChange: (data: Partial<WorkshopFormProps['formData']>) => void;
  loading: boolean;
  isAutoSaving?: boolean;
  lastSaved?: Date;
}

export const WorkshopForm: React.FC<WorkshopFormProps> = ({ onGenerate, formData, onFormDataChange, loading, isAutoSaving, lastSaved }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        Workshop planerare
      </h2>
      <p className="text-gray-600 text-center mb-4 text-sm">
        Skapa en workshop med Liberating Structures baserat på tid och antal deltagare
      </p>
      <div className="text-center mb-4">
        <AutoSaveIndicator isSaving={isAutoSaving || false} lastSaved={lastSaved} />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline w-4 h-4 mr-2" />
            Workshopens syfte och kontext
          </label>
          <textarea
            id="context"
            value={formData.context}
            onChange={(e) => onFormDataChange({ context: e.target.value })}
            placeholder="Beskriv vad workshoppen handlar om, vilken utmaning ni ska utforska och varför ni samlas..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            rows={3}
            required
          />
        </div>
        
        <div>
          <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline w-4 h-4 mr-2" />
            Konkreta mål för workshoppen
          </label>
          <textarea
            id="goals"
            value={formData.goals}
            onChange={(e) => onFormDataChange({ goals: e.target.value })}
            placeholder="Lista de konkreta målen ni vill uppnå under workshoppen..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            rows={3}
            required
          />
        </div>
        
        <PurposeSelector 
          selectedPurposes={formData.purposes}
          onPurposesChange={(purposes) => onFormDataChange({ purposes })}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline w-4 h-4 mr-2" />
              Antal timmar
            </label>
            <select
              id="hours"
              value={formData.hours}
              onChange={(e) => onFormDataChange({ hours: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(hour => (
                <option key={hour} value={hour}>
                  {hour} {hour === 1 ? 'timme' : 'timmar'}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-2" />
              Antal deltagare
            </label>
            <input
              type="number"
              id="participants"
              min="3"
              max="200"
              value={formData.participants}
              onChange={(e) => onFormDataChange({ participants: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading || !formData.context.trim() || !formData.goals.trim()}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center text-sm font-medium"
        >
          <Play className="w-4 h-4 mr-2" />
          {loading ? 'Genererar workshop...' : 'Generera Workshop'}
        </button>
      </form>
    </div>
  );
};