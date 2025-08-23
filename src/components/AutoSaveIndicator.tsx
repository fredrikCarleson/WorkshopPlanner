import React, { useState, useEffect } from 'react';
import { Check, Save } from 'lucide-react';

interface AutoSaveIndicatorProps {
  isSaving: boolean;
  lastSaved?: Date;
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({ 
  isSaving, 
  lastSaved 
}) => {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (lastSaved && !isSaving) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastSaved, isSaving]);

  if (isSaving) {
    return (
      <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
        <Save className="w-4 h-4 mr-2 animate-spin" />
        Sparar...
      </div>
    );
  }

  if (showSaved) {
    return (
      <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
        <Check className="w-4 h-4 mr-2" />
        Sparat
      </div>
    );
  }

  return (
    <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
      Sparas automatiskt
    </div>
  );
};
