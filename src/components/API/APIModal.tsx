import React, { useState, useEffect } from 'react';
import { APIEndpoint } from '../../types';
import { X, Code, Plus, Trash2 } from 'lucide-react';

interface APIModalProps {
  endpoint: APIEndpoint | null;
  onClose: () => void;
  onSave: (endpoint: Omit<APIEndpoint, 'id'>) => void;
}

export const APIModal: React.FC<APIModalProps> = ({ 
  endpoint, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    method: 'GET' as const,
    headers: {} as Record<string, string>,
    description: '',
    isActive: true
  });

  const [newHeader, setNewHeader] = useState({ key: '', value: '' });

  useEffect(() => {
    if (endpoint) {
      setFormData({
        name: endpoint.name,
        url: endpoint.url,
        method: endpoint.method,
        headers: endpoint.headers,
        description: endpoint.description,
        isActive: endpoint.isActive
      });
    }
  }, [endpoint]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAddHeader = () => {
    if (newHeader.key && newHeader.value) {
      setFormData({
        ...formData,
        headers: {
          ...formData.headers,
          [newHeader.key]: newHeader.value
        }
      });
      setNewHeader({ key: '', value: '' });
    }
  };

  const handleRemoveHeader = (keyToRemove: string) => {
    const newHeaders = { ...formData.headers };
    delete newHeaders[keyToRemove];
    setFormData({ ...formData, headers: newHeaders });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {endpoint ? 'Editar Endpoint' : 'Novo Endpoint API'}
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
                <Code className="w-4 h-4 inline mr-1" />
                Nome do Endpoint
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: WhatsApp Send Message"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descreva o que este endpoint faz..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método
                </label>
                <select
                  value={formData.method}
                  onChange={(e) => setFormData({ ...formData, method: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://api.exemplo.com/endpoint"
                  required
                />
              </div>
            </div>
          </div>

          {/* Headers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Headers</h3>
            </div>

            {/* Add new header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={newHeader.key}
                onChange={(e) => setNewHeader({ ...newHeader, key: e.target.value })}
                placeholder="Nome do header"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newHeader.value}
                  onChange={(e) => setNewHeader({ ...newHeader, value: e.target.value })}
                  placeholder="Valor do header"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddHeader}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Existing headers */}
            <div className="space-y-2">
              {Object.entries(formData.headers).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900">{key}: </span>
                    <span className="text-sm text-gray-600 font-mono">{value}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveHeader(key)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {Object.keys(formData.headers).length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhum header configurado
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
              Ativar endpoint imediatamente
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
              Salvar Endpoint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};