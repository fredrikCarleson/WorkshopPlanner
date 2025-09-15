import React from 'react';
import { useState } from 'react';
import { Clock, Users, RefreshCw, Download, Target, AlertTriangle, ArrowRight, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Workshop } from '../types/Workshop';
import { StructureCard } from './StructureCard';
import { ActivityEditModal } from './ActivityEditModal';
import { formatTime } from '../utils/workshopCalculator';
import { purposes } from '../data/purposes';

const getPhaseColor = (phase: string): string => {
  const colors = {
    'Open': 'bg-blue-100 text-blue-800 border-blue-200',
    'Diverge': 'bg-green-100 text-green-800 border-green-200',
    'Explore': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Converge': 'bg-orange-100 text-orange-800 border-orange-200',
    'Commit': 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[phase as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

interface WorkshopScheduleProps {
  workshop: Workshop;
  onReplaceActivity: (sessionIndex: number, newStructureId: string) => void;
  onEditActivity?: (sessionIndex: number, customData: any, newDuration?: number) => void;
}

export const WorkshopSchedule: React.FC<WorkshopScheduleProps> = ({ workshop, onReplaceActivity, onEditActivity }) => {
  const [editingSession, setEditingSession] = useState<number | null>(null);
  
  const handleExport = () => {
    const selectedPurposeNames = workshop.purposes
      .map(id => purposes.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');
    
    const scheduleText = `Workshop Schema - ${workshop.title}
=================

KONTEXT:
${workshop.context}

MÅL:
${workshop.goals}

Duration: ${workshop.duration} timmar
Starttid: ${workshop.startTime}
Deltagare: ${workshop.participants}
${selectedPurposeNames ? `Huvudsyfte: ${selectedPurposeNames}` : ''}
Total aktivitetstid: ${formatTime(workshop.totalTime)}

Schema:
-------
${workshop.sessions.map((session, index) => {
  let text = `${index + 1}. ${session.startTime} - ${session.endTime}: ${session.structure.name} (${session.duration}min) [${session.phase}]
   Syfte: ${session.purpose}
   Output: ${session.output}
   Beskrivning: ${session.structure.description}`;
   
  if (session.transition) {
    text += `\n   Transition: ${session.transition}`;
  }
  
  if (session.risks) {
    text += `\n   Risker: ${session.risks}
   Mitigering: ${session.mitigation}`;
  }
  
  return text;
}).join('\n\n')}

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

  const handleExportPDF = async () => {
    if (!workshop) return;

    try {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Starting PDF export...');
      }

      const element = document.getElementById('workshop-schedule');
      if (!element) {
        throw new Error('Workshop schedule element not found');
      }

      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Capturing canvas...');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Creating PDF...');
      }

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Saving PDF...');
      }

      const fileName = `workshop-${workshop.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      pdf.save(fileName);

      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('PDF export completed successfully');
      }

      // Cleanup
      canvas.remove();
      
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('PDF export cleanup completed');
      }

    } catch (error) {
      // In production, log to a proper logging service instead of console
      if (process.env.NODE_ENV === 'development') {
        console.error('PDF export error:', error);
      }
      // You could show a user-friendly error message here
      alert('Det gick inte att exportera PDF. Försök igen.');
    }
  };

  const handleEditActivity = (sessionIndex: number) => {
    setEditingSession(sessionIndex);
  };

  const handleSaveEdit = (sessionId: string, customData: any, newDuration?: number) => {
    const sessionIndex = workshop.sessions.findIndex(s => s.id === sessionId);
    if (sessionIndex !== -1 && onEditActivity) {
      onEditActivity(sessionIndex, customData, newDuration);
    }
    setEditingSession(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{workshop.title}</h2>
          
          {workshop.context && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Kontext och syfte:</h3>
              <p className="text-blue-800 text-sm leading-relaxed">{workshop.context}</p>
            </div>
          )}
          
          {workshop.goals && (
            <div className="mb-4 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Mål:</h3>
              <p className="text-green-800 text-sm leading-relaxed">{workshop.goals}</p>
            </div>
          )}
          
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
              <Clock className="w-4 h-4 mr-1" />
              Starttid: {workshop.startTime}
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
            onClick={handleExportPDF}
            className="no-print flex items-center px-4 py-2 text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors duration-200"
          >
            <FileText className="w-4 h-4 mr-2" />
            Exportera PDF
          </button>
          <button
            onClick={handleExport}
            className="no-print flex items-center px-4 py-2 text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportera
          </button>
        </div>
      </div>

      <div id="workshop-content" className="space-y-4">
        {workshop.context && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg print-context">
            <h3 className="font-semibold text-blue-900 mb-2">Kontext och syfte:</h3>
            <div className="text-blue-800 text-sm leading-relaxed whitespace-pre-wrap">{workshop.context}</div>
          </div>
        )}
        
        {workshop.goals && (
          <div className="mb-4 p-4 bg-green-50 rounded-lg print-goals">
            <h3 className="font-semibold text-green-900 mb-2">Mål:</h3>
            <div className="text-green-800 text-sm leading-relaxed whitespace-pre-wrap">{workshop.goals}</div>
          </div>
        )}

        {workshop.sessions.map((session, index) => (
          <div key={session.id} className="border rounded-lg p-4 bg-gray-50 workshop-session print-avoid-break">
            <div className="flex items-start justify-between mb-3 session-header">
                          <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-24 text-sm text-gray-500 session-time">
                {session.startTime} - {session.endTime}
                <br />
                <span className="text-xs">({session.duration}min)</span>
              </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium session-phase ${getPhaseColor(session.phase)}`}>
                  {session.phase}
                </span>
              </div>
            </div>
            
            <div className="ml-23 session-content">
              <StructureCard 
                structure={session.structure} 
                duration={session.duration}
                session={session}
                sessionIndex={index}
                onReplaceActivity={onReplaceActivity}
                isReplaceable={!['welcome', 'closing', 'short-break', 'long-break'].includes(session.structure.id)}
                participants={workshop.participants}
                onEditActivity={handleEditActivity}
              />
              
              <div className="mt-3 space-y-2 session-details">
                <div className="flex items-start session-detail-item">
                  <Target className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-gray-700 session-detail-label">Syfte: </span>
                    <span className="text-sm text-gray-600">{session.customData?.purpose || session.purpose}</span>
                  </div>
                </div>
                
                <div className="flex items-start session-detail-item">
                  <ArrowRight className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-gray-700 session-detail-label">Output: </span>
                    <span className="text-sm text-gray-600">{session.customData?.output || session.output}</span>
                  </div>
                </div>
                
                {(session.customData?.risks || session.risks) && (
                  <div className="flex items-start session-detail-item">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-gray-700 session-detail-label">Risk: </span>
                      <span className="text-sm text-gray-600">{session.customData?.risks || session.risks}</span>
                      <br />
                      <span className="text-sm font-medium text-gray-700 session-detail-label">Mitigering: </span>
                      <span className="text-sm text-gray-600">{session.customData?.mitigation || session.mitigation}</span>
                    </div>
                  </div>
                )}
                
                {(session.customData?.transition || session.transition) && index < workshop.sessions.length - 1 && (
                  <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                    <span className="text-sm font-medium text-blue-800">Transition till nästa aktivitet: </span>
                    <span className="text-sm text-blue-700 italic">"{session.customData?.transition || session.transition}"</span>
                  </div>
                )}
              </div>
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
      
      {editingSession !== null && (
        <ActivityEditModal
          session={workshop.sessions[editingSession]}
          isOpen={editingSession !== null}
          onClose={() => setEditingSession(null)}
          onSave={handleSaveEdit}
          participants={workshop.participants}
        />
      )}
    </div>
  );
};
