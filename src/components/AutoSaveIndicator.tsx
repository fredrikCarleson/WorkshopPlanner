import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';

interface AutoSaveIndicatorProps {
  isSaving: boolean;
  lastSaved?: Date;
}

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({ isSaving, lastSaved }) => {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (lastSaved && !isSaving) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastSaved, isSaving]);

  if (!isSaving && !showSaved) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3 flex items-center space-x-2">
        {isSaving ? (
          <>
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
            <span className="text-sm text-gray-700">Sparar...</span>
          </>
        ) : (
          <>
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-700">Sparad</span>
          </>
        )}
      </div>
    </div>
  );
};
