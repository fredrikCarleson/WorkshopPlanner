import React, { useState, useEffect, useRef } from 'react';
import { Clock, Users, ChevronDown, ChevronUp, Coffee, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { LiberatingStructure } from '../types/Workshop';
import { getCategoryColor, liberatingStructures } from '../data/liberatingStructures';



interface StructureCardProps {
  structure: LiberatingStructure;
  duration?: number;
  showDetails?: boolean;
  isBreak?: boolean;
  sessionIndex?: number;
  onReplaceActivity?: (sessionIndex: number, newStructureId: string) => void;
  isReplaceable?: boolean;
  participants?: number;
}

export const StructureCard: React.FC<StructureCardProps> = ({ 
  structure, 
  duration, 
  showDetails = false,
  isBreak = false,
  sessionIndex,
  onReplaceActivity,
  isReplaceable = false,
  participants = 12
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplaceDropdown, setShowReplaceDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowReplaceDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Find compatible activities from the same category
  const compatibleActivities = isReplaceable ? liberatingStructures.filter(s => 
    s.category === structure.category && 
    s.id !== structure.id &&
    s.id !== 'welcome' && 
    s.id !== 'closing' && 
    s.id !== 'short-break' && 
    s.id !== 'long-break'
  ) : [];
  
  const handleReplaceActivity = (newStructureId: string) => {
    if (onReplaceActivity && sessionIndex !== undefined) {
      onReplaceActivity(sessionIndex, newStructureId);
      setShowReplaceDropdown(false);
    }
  };
  
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
      
      <div className="flex gap-2 mb-3">
        {!showDetails && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="no-print flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
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
        
        {isReplaceable && compatibleActivities.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowReplaceDropdown(!showReplaceDropdown)}
              className="no-print flex items-center text-green-600 hover:text-green-800 text-sm font-medium transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Byt övning
            </button>
            
            {showReplaceDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-64">
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 mb-2 px-2">
                    Övningar från samma kategori ({structure.category}):
                  </div>
                  {compatibleActivities.map((activity) => {
                    const baseDuration = activity.baseTime + (activity.scalingFactor * participants);
                    const estimatedDuration = Math.ceil(baseDuration / 5) * 5;
                    return (
                      <button
                        key={activity.id}
                        onClick={() => handleReplaceActivity(activity.id)}
                        className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium text-gray-900">{activity.name}</div>
                          <div className="text-xs text-gray-500">{activity.description}</div>
                        </div>
                        <div className="text-xs text-gray-400 ml-2">
                          ~{estimatedDuration}min
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
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