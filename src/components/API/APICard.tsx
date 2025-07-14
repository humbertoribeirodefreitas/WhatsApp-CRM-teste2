import React from 'react';
import { APIEndpoint } from '../../types';
import { 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  Code,
  Clock,
  ExternalLink,
  TestTube
} from 'lucide-react';

interface APICardProps {
  endpoint: APIEndpoint;
  onEdit: (endpoint: APIEndpoint) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onTest: (endpoint: APIEndpoint) => void;
}

export const APICard: React.FC<APICardProps> = ({
  endpoint,
  onEdit,
  onDelete,
  onToggle,
  onTest
}) => {
  const getMethodColor = (method: string) => {
    const colors = {
      GET: 'bg-green-100 text-green-800',
      POST: 'bg-blue-100 text-blue-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800'
    };
    return colors[method as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Nunca usado';
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
      endpoint.isActive ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{endpoint.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              endpoint.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {endpoint.isActive ? 'Ativo' : 'Inativo'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
              {endpoint.method}
            </span>
            <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
              {endpoint.url}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onTest(endpoint)}
            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <TestTube className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggle(endpoint.id)}
            className={`p-2 rounded-lg transition-colors ${
              endpoint.isActive
                ? 'text-green-600 hover:bg-green-50'
                : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            {endpoint.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onEdit(endpoint)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(endpoint.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Headers */}
      {Object.keys(endpoint.headers).length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Headers:</h4>
          <div className="space-y-1">
            {Object.entries(endpoint.headers).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2 text-xs">
                <span className="font-medium text-gray-700">{key}:</span>
                <span className="text-gray-600 font-mono bg-gray-100 px-1 rounded">
                  {value.length > 30 ? `${value.substring(0, 30)}...` : value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Último uso: {formatDate(endpoint.lastUsed)}</span>
        </div>
        {endpoint.responseTime && (
          <div className="flex items-center space-x-1">
            <span>Tempo: {endpoint.responseTime}ms</span>
          </div>
        )}
      </div>
    </div>
  );
};