import React from 'react';
import { Clock, Users, RefreshCw, Download } from 'lucide-react';
import { Workshop } from '../types/Workshop';
import { StructureCard } from './StructureCard';
import { formatTime } from '../utils/workshopCalculator';
import { purposes } from '../data/purposes';

interface WorkshopScheduleProps {
  workshop: Workshop;
  onRegenerate: () => void;
}

export const WorkshopSchedule: React.FC<WorkshopScheduleProps> = ({ workshop, onRegenerate }) => {
  const handleExport = () => {
    const selectedPurposeNames = workshop.purposes
      .map(id => purposes.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');
    
    const scheduleText = `Workshop Schema
=================

Duration: ${workshop.duration} timmar
Deltagare: ${workshop.participants}
${selectedPurposeNames ? `Huvudsyfte: ${selectedPurposeNames}` : ''}
Total aktivitetstid: ${formatTime(workshop.totalTime)}

Schema:
-------
${workshop.sessions.map((session, index) => 
  `${index + 1}. ${session.startTime} - ${session.endTime}: ${session.structure.name} (${session.duration}min)
   ${session.structure.description}`
).join('\n\n')}

Genererad med Workshop Planner`;

    const blob = new Blob([scheduleText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `workshop-schema-${workshop.duration}h-${workshop.participants}p.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ditt workshopschema</h2>
          {workshop.purposes.length > 0 && (
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700">Fokusområden: </span>
              <span className="text-sm text-blue-600">
                {workshop.purposes
                  .map(id => purposes.find(p => p.id === id)?.name)
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </div>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {workshop.duration} timmar total
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {workshop.participants} deltagare
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(workshop.totalTime)} aktivitet
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={onRegenerate}
            className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerera
          </button>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportera
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {workshop.sessions.map((session, index) => (
          <div key={session.id} className="flex items-start">
            <div className="flex-shrink-0 w-20 text-sm text-gray-500 pt-4">
              {session.startTime}
              <br />
              <span className="text-xs">({session.duration}min)</span>
            </div>
            <div className="flex-1 ml-4">
              <StructureCard 
                structure={session.structure} 
                duration={session.duration}
              />
            </div>
          </div>
        ))}
      </div>

      {workshop.sessions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Inga aktiviteter kunde genereras för dessa parametrar.</p>
          <p className="text-gray-400 text-sm mt-2">Prova att ändra antalet deltagare eller workshoplängden.</p>
        </div>
      )}
    </div>
  );
};