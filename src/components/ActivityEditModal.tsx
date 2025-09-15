import React, { useState, useEffect } from 'react';
import { X, Save, AlertTriangle } from 'lucide-react';
import { WorkshopSession } from '../types/Workshop';

interface ActivityEditModalProps {
  session: WorkshopSession;
  isOpen: boolean;
  onClose: () => void;
  onSave: (sessionId: string, customData: any, newDuration?: number) => void;
  participants: number;
}

export const ActivityEditModal: React.FC<ActivityEditModalProps> = ({
  session,
  isOpen,
  onClose,
  onSave,
  participants
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    purpose: '',
    output: '',
    transition: '',
    risks: '',
    mitigation: '',
    duration: 0
  });

  useEffect(() => {
    if (session) {
      setFormData({
        title: session.customData?.title || session.structure.name,
        description: session.customData?.description || session.structure.description,
        instructions: session.customData?.instructions || session.structure.instructions,
        purpose: session.customData?.purpose || session.purpose,
        output: session.customData?.output || session.output,
        transition: session.customData?.transition || session.transition,
        risks: session.customData?.risks || session.risks,
        mitigation: session.customData?.mitigation || session.mitigation,
        duration: session.duration
      });
    }
  }, [session]);

  const handleSave = () => {
    const customData = {
      title: formData.title,
      description: formData.description,
      instructions: formData.instructions,
      purpose: formData.purpose,
      output: formData.output,
      transition: formData.transition,
      risks: formData.risks,
      mitigation: formData.mitigation
    };

    const newDuration = formData.duration !== session.duration ? formData.duration : undefined;
    onSave(session.id, customData, newDuration);
    onClose();
  };

  const handleDurationChange = (value: number) => {
    // Round to nearest 5 minutes
    const roundedValue = Math.round(value / 5) * 5;
    setFormData(prev => ({ ...prev, duration: Math.max(5, Math.min(180, roundedValue)) }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Redigera aktivitet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Observera:</p>
                <p>Ändringar sparas endast för denna workshop. Om du klickar "Regenerera övningar" kommer alla anpassningar att försvinna.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titel
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Aktivitetens titel"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Varaktighet (minuter)
              </label>
              <input
                type="number"
                min="5"
                max="180"
                step="5"
                value={formData.duration}
                onChange={(e) => handleDurationChange(parseInt(e.target.value) || 5)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kort beskrivning
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              placeholder="Kort beskrivning av aktiviteten"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genomförande/Instruktioner
            </label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              placeholder="Detaljerade instruktioner för hur aktiviteten genomförs..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Syfte
            </label>
            <textarea
              value={formData.purpose}
              onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              placeholder="Vad är syftet med denna aktivitet?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Förväntat resultat/Output
            </label>
            <textarea
              value={formData.output}
              onChange={(e) => setFormData(prev => ({ ...prev, output: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              placeholder="Vad kommer aktiviteten att resultera i?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transition till nästa aktivitet
            </label>
            <textarea
              value={formData.transition}
              onChange={(e) => setFormData(prev => ({ ...prev, transition: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              placeholder="Hur leder du över till nästa aktivitet?"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risker
              </label>
              <textarea
                value={formData.risks}
                onChange={(e) => setFormData(prev => ({ ...prev, risks: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                placeholder="Vad kan gå fel?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mitigering
              </label>
              <textarea
                value={formData.mitigation}
                onChange={(e) => setFormData(prev => ({ ...prev, mitigation: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                placeholder="Hur hanterar du riskerna?"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Avbryt
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Spara ändringar
          </button>
        </div>
      </div>
    </div>
  );
};