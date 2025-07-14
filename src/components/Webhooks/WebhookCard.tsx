import React from 'react';
import { WebhookConfig } from '../../types';
import { 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  Webhook,
  Clock,
  Shield,
  ExternalLink,
  Copy
} from 'lucide-react';

interface WebhookCardProps {
  webhook: WebhookConfig;
  onEdit: (webhook: WebhookConfig) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export const WebhookCard: React.FC<WebhookCardProps> = ({
  webhook,
  onEdit,
  onDelete,
  onToggle
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 ${
      webhook.isActive ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{webhook.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              webhook.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {webhook.isActive ? 'Ativo' : 'Inativo'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Webhook className="w-4 h-4" />
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
              {webhook.url}
            </span>
            <button
              onClick={() => copyToClipboard(webhook.url)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onToggle(webhook.id)}
            className={`p-2 rounded-lg transition-colors ${
              webhook.isActive
                ? 'text-green-600 hover:bg-green-50'
                : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            {webhook.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onEdit(webhook)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(webhook.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Events */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Eventos Monitorados:</h4>
        <div className="flex flex-wrap gap-1">
          {webhook.events.map((event, index) => (
            <span key={index} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {event}
            </span>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">Segurança</span>
        </div>
        <div className="text-xs text-gray-600">
          <span>Secret: </span>
          <span className="font-mono bg-white px-2 py-1 rounded">
            {webhook.secret.substring(0, 8)}...
          </span>
          <button
            onClick={() => copyToClipboard(webhook.secret)}
            className="ml-2 p-1 hover:bg-gray-200 rounded"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Criado em {formatDate(webhook.createdAt)}</span>
        </div>
        {webhook.lastTriggered && (
          <div className="flex items-center space-x-1">
            <span>Último uso: {formatDate(webhook.lastTriggered)}</span>
          </div>
        )}
      </div>
    </div>
  );
};