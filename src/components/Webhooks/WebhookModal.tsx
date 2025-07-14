import React, { useState, useEffect } from 'react';
import { WebhookConfig } from '../../types';
import { X, Webhook, Shield, Plus, Trash2 } from 'lucide-react';

interface WebhookModalProps {
  webhook: WebhookConfig | null;
  onClose: () => void;
  onSave: (webhook: Omit<WebhookConfig, 'id' | 'createdAt'>) => void;
}

export const WebhookModal: React.FC<WebhookModalProps> = ({ 
  webhook, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    secret: '',
    events: [] as string[],
    isActive: true
  });

  const [newEvent, setNewEvent] = useState('');

  const availableEvents = [
    'whatsapp.message.received',
    'whatsapp.message.sent',
    'whatsapp.status.updated',
    'contact.created',
    'contact.updated',
    'trello.card.created',
    'trello.card.updated',
    'automation.triggered',
    'conversation.started',
    'conversation.ended'
  ];

  useEffect(() => {
    if (webhook) {
      setFormData({
        name: webhook.name,
        url: webhook.url,
        secret: webhook.secret,
        events: webhook.events,
        isActive: webhook.isActive
      });
    } else {
      // Generate a random secret for new webhooks
      setFormData(prev => ({
        ...prev,
        secret: generateSecret()
      }));
    }
  }, [webhook]);

  const generateSecret = () => {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAddEvent = () => {
    if (newEvent && !formData.events.includes(newEvent)) {
      setFormData({
        ...formData,
        events: [...formData.events, newEvent]
      });
      setNewEvent('');
    }
  };

  const handleRemoveEvent = (eventToRemove: string) => {
    setFormData({
      ...formData,
      events: formData.events.filter(event => event !== eventToRemove)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {webhook ? 'Editar Webhook' : 'Novo Webhook'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Webhook className="w-4 h-4 inline mr-1" />
                Nome do Webhook
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: WhatsApp Business API"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL do Endpoint
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://api.exemplo.com/webhook"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Este será o endpoint que receberá os dados do webhook
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Segurança
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret Key
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={formData.secret}
                  onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, secret: generateSecret() })}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Gerar
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Chave secreta para validar a autenticidade dos webhooks
              </p>
            </div>
          </div>

          {/* Events */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Eventos</h3>
            </div>

            {/* Add new event */}
            <div className="flex space-x-2">
              <select
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione um evento</option>
                {availableEvents
                  .filter(event => !formData.events.includes(event))
                  .map(event => (
                    <option key={event} value={event}>{event}</option>
                  ))
                }
              </select>
              <button
                type="button"
                onClick={handleAddEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar</span>
              </button>
            </div>

            {/* Selected events */}
            <div className="space-y-2">
              {formData.events.map(event => (
                <div key={event} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-900">{event}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEvent(event)}
                    className="text-blue-600 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {formData.events.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhum evento selecionado
                </p>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Ativar webhook imediatamente
            </label>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Salvar Webhook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};