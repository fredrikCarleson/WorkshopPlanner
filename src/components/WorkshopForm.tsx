import React, { useState } from 'react';
import { Clock, Users, Play, FileText } from 'lucide-react';
import { PurposeSelector } from './PurposeSelector';

interface WorkshopFormProps {
  onSave: () => void;
  onRegenerate: () => void;
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
  hasWorkshop: boolean;
}

export const WorkshopForm: React.FC<WorkshopFormProps> = ({ onSave, onRegenerate, formData, onFormDataChange, loading, hasWorkshop }) => {

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  const handleRegenerate = (e: React.FormEvent) => {
    e.preventDefault();
    onRegenerate();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        Workshop planerare
      </h2>
             <p className="text-gray-600 text-center mb-4 text-sm">
         Skapa en workshop med Liberating Structures. Ändringar visas automatiskt i förhandsvisningen. Klicka "Spara Workshop" för att spara eller "Regenerera övningar" för nya slumpmässiga övningar.
       </p>
      
      <form onSubmit={handleSave} className="space-y-4">
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
        
        <div className="flex gap-3">
                     <button
             type="submit"
             disabled={loading || !formData.context.trim() || !formData.goals.trim()}
             className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center text-sm font-medium"
           >
             <Play className="w-4 h-4 mr-2" />
             {loading ? 'Sparar...' : 'Spara Workshop'}
           </button>
          
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={loading || !formData.context.trim() || !formData.goals.trim()}
            className="flex-1 py-3 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center text-sm font-medium"
          >
            <Play className="w-4 h-4 mr-2" />
            {loading ? 'Regenererar...' : 'Regenerera övningar'}
          </button>
        </div>
      </form>
    </div>
  );
};