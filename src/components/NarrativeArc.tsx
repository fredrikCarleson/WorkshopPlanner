import React from 'react';

export const NarrativeArc: React.FC = () => {
  const phases = [
    { name: 'Open', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { name: 'Diverge', color: 'bg-green-100 text-green-800 border-green-200' },
    { name: 'Explore', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { name: 'Converge', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { name: 'Commit', color: 'bg-red-100 text-red-800 border-red-200' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Narrativ båge:</h3>
      
      <div className="flex items-center justify-between mb-4">
        {phases.map((phase, index) => (
          <React.Fragment key={phase.name}>
            <div className={`px-4 py-2 rounded-lg border-2 font-medium text-sm ${phase.color}`}>
              {phase.name}
            </div>
            {index < phases.length - 1 && (
              <svg 
                className="w-5 h-5 text-gray-400 mx-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        Workshoppen följer en strukturerad narrativ båge från öppning till åtagande, där varje fas bygger på den föregående för att skapa en sammanhängande upplevelse.
      </p>
    </div>
  );
};
