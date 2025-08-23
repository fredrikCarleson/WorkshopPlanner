import React, { useState, useEffect } from 'react';
import { Clock, Users, Calendar, FileText, Trash2, ExternalLink, Plus } from 'lucide-react';
import { SavedWorkshop } from '../types/Workshop';
import { getSavedWorkshops, deleteWorkshop, cleanupDuplicateWorkshops } from '../utils/workshopManager';

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

  const handleCleanupDuplicates = () => {
    if (window.confirm('Detta kommer att ta bort duplicerade workshops och behålla endast den senaste versionen av varje. Fortsätt?')) {
      cleanupDuplicateWorkshops();
      loadSavedWorkshops();
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('sv-SE', {
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
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="text-center py-6">
          <FileText className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">Inga sparade workshops</h3>
          <p className="text-gray-600 mb-3 text-xs">
            Dina workshops sparas automatiskt när du arbetar med dem.
          </p>
          <button
            onClick={onNewWorkshop}
            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-3 h-3 mr-1" />
            Ny workshop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Mina Workshops</h2>
          <p className="text-gray-600 text-xs mt-1">
            {savedWorkshops.length} workshop{savedWorkshops.length !== 1 ? 's' : ''} sparad{savedWorkshops.length !== 1 ? 'a' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
          >
            {isExpanded ? 'Visa mindre' : 'Visa alla'}
          </button>
          <button
            onClick={handleCleanupDuplicates}
            className="px-2 py-1 text-xs text-orange-600 hover:text-orange-800 transition-colors"
            title="Ta bort duplicerade workshops"
          >
            Rensa
          </button>
          <button
            onClick={onNewWorkshop}
            className="inline-flex items-center px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Ny
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {savedWorkshops.slice(0, isExpanded ? undefined : 3).map((workshop) => (
          <div
            key={workshop.id}
            className="border border-gray-200 rounded-md p-3 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
            onClick={() => onLoadWorkshop(workshop)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900 truncate text-sm">
                    {workshop.name}
                  </h3>
                  <span className={`inline-block px-1 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workshop.status)}`}>
                    {getStatusText(workshop.status)}
                  </span>
                </div>
                
                {workshop.formData && (
                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-1">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {workshop.formData.hours}h
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {workshop.formData.participants}
                    </div>
                    {workshop.workshop && (
                      <div className="flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        {workshop.workshop.sessions.length}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(workshop.lastModified)}
                </div>
              </div>
              
              <div className="flex items-center gap-1 ml-2">
                <a
                  href={workshop.url}
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Öppna i ny flik"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteWorkshop(workshop.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Ta bort workshop"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isExpanded && savedWorkshops.length > 3 && (
        <div className="text-center mt-3">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-blue-600 hover:text-blue-800 text-xs font-medium"
          >
            Visa alla {savedWorkshops.length} workshops
          </button>
        </div>
      )}
    </div>
  );
};
