import React, { useState, useEffect } from 'react';
import { Clock, Users, Calendar, FileText, Trash2, ExternalLink, Plus } from 'lucide-react';
import { SavedWorkshop } from '../types/Workshop';
import { getSavedWorkshops, deleteWorkshop } from '../utils/workshopManager';

interface WorkshopLibraryProps {
  onLoadWorkshop: (workshop: SavedWorkshop) => void;
  onNewWorkshop: () => void;
}

export const WorkshopLibrary: React.FC<WorkshopLibraryProps> = ({ 
  onLoadWorkshop, 
  onNewWorkshop 
}) => {
  const [savedWorkshops, setSavedWorkshops] = useState<SavedWorkshop[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    loadSavedWorkshops();
  }, []);

  const loadSavedWorkshops = () => {
    const workshops = getSavedWorkshops();
    // Sort by last modified date (newest first)
    workshops.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
    setSavedWorkshops(workshops);
  };

  const handleDeleteWorkshop = (id: string) => {
    if (window.confirm('Är du säker på att du vill ta bort denna workshop?')) {
      deleteWorkshop(id);
      loadSavedWorkshops();
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: 'draft' | 'completed') => {
    return status === 'completed' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getStatusText = (status: 'draft' | 'completed') => {
    return status === 'completed' ? 'Slutförd' : 'Utkast';
  };

  if (savedWorkshops.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Inga sparade workshops</h3>
          <p className="text-gray-600 mb-4">
            Dina workshops kommer att sparas automatiskt när du arbetar med dem.
          </p>
          <button
            onClick={onNewWorkshop}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Skapa ny workshop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mina Workshops</h2>
          <p className="text-gray-600 mt-1">
            {savedWorkshops.length} workshop{savedWorkshops.length !== 1 ? 's' : ''} sparad{savedWorkshops.length !== 1 ? 'a' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            {isExpanded ? 'Visa mindre' : 'Visa alla'}
          </button>
          <button
            onClick={onNewWorkshop}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ny workshop
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {savedWorkshops.slice(0, isExpanded ? undefined : 3).map((workshop) => (
          <div
            key={workshop.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            onClick={() => onLoadWorkshop(workshop)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-gray-900 truncate">
                    {workshop.name}
                  </h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workshop.status)}`}>
                    {getStatusText(workshop.status)}
                  </span>
                </div>
                
                {workshop.formData && (
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {workshop.formData.hours}h
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {workshop.formData.participants} deltagare
                    </div>
                    {workshop.workshop && (
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {workshop.workshop.sessions.length} aktiviteter
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  Senast ändrad: {formatDate(workshop.lastModified)}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <a
                  href={workshop.url}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Öppna i ny flik"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteWorkshop(workshop.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Ta bort workshop"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isExpanded && savedWorkshops.length > 3 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Visa alla {savedWorkshops.length} workshops
          </button>
        </div>
      )}
    </div>
  );
};
