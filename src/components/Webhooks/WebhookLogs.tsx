import React, { useState } from 'react';
import { WebhookEvent } from '../../types';
import { X, Activity, CheckCircle, AlertCircle, Clock, Filter } from 'lucide-react';

interface WebhookLogsProps {
  events: WebhookEvent[];
  onClose: () => void;
}

export const WebhookLogs: React.FC<WebhookLogsProps> = ({ events, onClose }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || 
      (filter === 'processed' && event.processed) ||
      (filter === 'error' && event.error) ||
      (filter === 'pending' && !event.processed && !event.error);
    
    const matchesSearch = event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getEventIcon = (event: WebhookEvent) => {
    if (event.error) return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (event.processed) return <CheckCircle className="w-4 h-4 text-green-500" />;
    return <Clock className="w-4 h-4 text-yellow-500" />;
  };

  const getEventStatus = (event: WebhookEvent) => {
    if (event.error) return { label: 'Erro', color: 'bg-red-100 text-red-800' };
    if (event.processed) return { label: 'Processado', color: 'bg-green-100 text-green-800' };
    return { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' };
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Logs de Webhook</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por tipo ou origem..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos</option>
                <option value="processed">Processados</option>
                <option value="error">Com Erro</option>
                <option value="pending">Pendentes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {filteredEvents.length === 0 ? (
            <div className="p-8 text-center">
              <Activity className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Nenhum evento encontrado</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredEvents.map(event => {
                const status = getEventStatus(event);
                return (
                  <div key={event.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getEventIcon(event)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {event.type}
                            </h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Origem: {event.source}
                          </p>
                          {event.error && (
                            <p className="text-sm text-red-600 mb-2">
                              Erro: {event.error}
                            </p>
                          )}
                          <details className="text-xs text-gray-500">
                            <summary className="cursor-pointer hover:text-gray-700">
                              Ver dados do evento
                            </summary>
                            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                              {JSON.stringify(event.data, null, 2)}
                            </pre>
                          </details>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 ml-4">
                        {formatTimestamp(event.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total: {filteredEvents.length} eventos</span>
            <span>
              Processados: {filteredEvents.filter(e => e.processed).length} | 
              Erros: {filteredEvents.filter(e => e.error).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};