import React, { useState } from 'react';
import { Clock, Users, Play } from 'lucide-react';
import { PurposeSelector } from './PurposeSelector';

interface WorkshopFormProps {
  onGenerate: (hours: number, participants: number, purposes: string[]) => void;
  loading: boolean;
}

export const WorkshopForm: React.FC<WorkshopFormProps> = ({ onGenerate, loading }) => {
  const [hours, setHours] = useState(4);
  const [participants, setParticipants] = useState(12);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(hours, participants, selectedPurposes);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Workshopplanerare
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Skapa en workshop med Liberating Structures baserat på tid och antal deltagare
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <PurposeSelector 
          selectedPurposes={selectedPurposes}
          onPurposesChange={setSelectedPurposes}
        />
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline w-4 h-4 mr-2" />
              Antal timmar
            </label>
            <select
              id="hours"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              value={participants}
              onChange={(e) => setParticipants(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
        >
          <Play className="w-5 h-5 mr-2" />
          {loading ? 'Genererar workshop...' : 'Generera Workshop'}
        </button>
      </form>
    </div>
  );
};