import React from 'react';
import { Target, Check } from 'lucide-react';
import { purposes } from '../data/purposes';

interface PurposeSelectorProps {
  selectedPurposes: string[];
  onPurposesChange: (purposes: string[]) => void;
}

export const PurposeSelector: React.FC<PurposeSelectorProps> = ({ 
  selectedPurposes, 
  onPurposesChange 
}) => {
  const handlePurposeToggle = (purposeId: string) => {
    if (selectedPurposes.includes(purposeId)) {
      onPurposesChange(selectedPurposes.filter(id => id !== purposeId));
    } else if (selectedPurposes.length < 5) {
      onPurposesChange([...selectedPurposes, purposeId]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        <Target className="inline w-4 h-4 mr-2" />
        Huvudsyfte med workshoppen (välj 1-5 områden)
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {purposes.map(purpose => (
          <button
            key={purpose.id}
            type="button"
            onClick={() => handlePurposeToggle(purpose.id)}
            disabled={!selectedPurposes.includes(purpose.id) && selectedPurposes.length >= 5}
            className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
              selectedPurposes.includes(purpose.id)
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            } ${
              !selectedPurposes.includes(purpose.id) && selectedPurposes.length >= 5
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-sm mb-1">{purpose.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{purpose.description}</p>
              </div>
              {selectedPurposes.includes(purpose.id) && (
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
              )}
            </div>
          </button>
        ))}
      </div>
      {selectedPurposes.length > 0 && (
        <p className="text-sm text-gray-600 mt-2">
          {selectedPurposes.length} av 5 områden valda. Övningar kommer att anpassas efter dina val.
        </p>
      )}
    </div>
  );
};