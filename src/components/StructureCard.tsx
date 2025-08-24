import React, { useState } from 'react';
import { Clock, Users, ChevronDown, ChevronUp, Coffee } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { LiberatingStructure } from '../types/Workshop';
import { getCategoryColor } from '../data/liberatingStructures';



interface StructureCardProps {
  structure: LiberatingStructure;
  duration?: number;
  showDetails?: boolean;
  isBreak?: boolean;
}

export const StructureCard: React.FC<StructureCardProps> = ({ 
  structure, 
  duration, 
  showDetails = false,
  isBreak = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (isBreak) {
    return (
      <div className="bg-amber-50 rounded-lg shadow-md p-4 border-l-4 border-amber-400 print-avoid-break">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Coffee className="w-5 h-5 text-amber-600 mr-2" />
            <h3 className="font-semibold text-amber-800">{structure.name}</h3>
          </div>
          {duration && (
            <div className="text-sm text-amber-700 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {duration}min
            </div>
          )}
        </div>
        <p className="text-amber-700 text-sm mt-2">{structure.description}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 border-l-4 border-blue-500 print-avoid-break">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            <span className="text-lg mr-2">{structure.icon}</span>
            {structure.name}
          </h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(structure.category)}`}>
            {structure.category}
          </span>
        </div>
        {duration && (
          <div className="text-sm text-gray-600 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {duration}min
          </div>
        )}
      </div>
      
      <p className="text-gray-600 text-sm mb-3">{structure.description}</p>
      
      {!showDetails && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="no-print flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 mb-3"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Dölj instruktioner
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Visa instruktioner
            </>
          )}
        </button>
      )}
      
      {(isExpanded || showDetails) && (
        <div className="bg-gray-50 rounded-md p-3 mb-3 session-instructions">
          <h4 className="font-medium text-gray-900 mb-3">Genomförande:</h4>
          <div className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown 
              components={{
                p: ({children}) => <p className="mb-3 leading-relaxed">{children}</p>,
                strong: ({children}) => {
                  const text = children?.toString() || '';
                  if (text.includes('Tips:')) {
                    return <strong className="font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded">{children}</strong>;
                  }
                  return <strong className="font-semibold text-gray-900">{children}</strong>;
                },
                ul: ({children}) => <ul className="list-disc list-inside space-y-2 mb-3 ml-4">{children}</ul>,
                li: ({children}) => <li className="text-gray-700 leading-relaxed">{children}</li>
              }}
            >
              {structure.instructions}
            </ReactMarkdown>
          </div>
        </div>
      )}
      
      {showDetails && (
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Users className="w-3 h-3 mr-1" />
            {structure.minParticipants}-{structure.maxParticipants === 200 ? '200+' : structure.maxParticipants}
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            ~{structure.baseTime}min bas
          </div>
        </div>
      )}
    </div>
  );
};