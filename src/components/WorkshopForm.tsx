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
    startTime: string;
  };
  onFormDataChange: (data: Partial<WorkshopFormProps['formData']>) => void;
  loading: boolean;
  isAutoSaving?: boolean;
  lastSaved?: Date;
  hasStructuralChanges?: boolean;
}

export const WorkshopForm: React.FC<WorkshopFormProps> = ({ onGenerate, formData, onFormDataChange, loading, isAutoSaving, lastSaved, hasStructuralChanges }) => {

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
        Skapa en workshop med Liberating Structures. De flesta ändringar uppdateras automatiskt, men ändringar av tid och fokusområden kräver explicit regenerering.
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
        
        <div className="grid grid-cols-3 gap-4">
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

          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline w-4 h-4 mr-2" />
              Starttid
            </label>
            <input
              type="time"
              id="startTime"
              value={formData.startTime}
              onChange={(e) => onFormDataChange({ startTime: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
        
        {hasStructuralChanges && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md mb-4">
            <p className="text-sm text-amber-800">
              <strong>Antal timmar eller fokusområden har ändrats.</strong> Klicka "Regenerera övningar" för att applicera ändringarna.
            </p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading || !formData.context.trim() || !formData.goals.trim()}
          className={`w-full py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center text-sm font-medium ${
            hasStructuralChanges 
              ? 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500' 
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
          }`}
        >
          <Play className="w-4 h-4 mr-2" />
          {loading ? 'Regenererar övningar...' : hasStructuralChanges ? 'Regenerera övningar' : 'Spara Workshop'}
        </button>
      </form>
    </div>
  );
};