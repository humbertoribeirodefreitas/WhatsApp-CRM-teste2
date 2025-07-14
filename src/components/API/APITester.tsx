import React, { useState } from 'react';
import { APIEndpoint } from '../../types';
import { X, Play, Code, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface APITesterProps {
  endpoint: APIEndpoint | null;
  endpoints: APIEndpoint[];
  onClose: () => void;
  onTest: (endpoint: APIEndpoint, body?: string) => Promise<any>;
}

export const APITester: React.FC<APITesterProps> = ({ 
  endpoint, 
  endpoints,
  onClose, 
  onTest 
}) => {
  const [selectedEndpointId, setSelectedEndpointId] = useState(endpoint?.id || '');
  const [requestBody, setRequestBody] = useState('{\n  "message": "Hello World"\n}');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedEndpoint = endpoints.find(e => e.id === selectedEndpointId);

  const handleTest = async () => {
    if (!selectedEndpoint) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await onTest(selectedEndpoint, requestBody);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const formatJSON = (obj: any) => {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return String(obj);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Testador de API</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Request Panel */}
          <div className="w-1/2 p-6 border-r">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Requisição</h3>
            
            {/* Endpoint Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endpoint
              </label>
              <select
                value={selectedEndpointId}
                onChange={(e) => setSelectedEndpointId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione um endpoint</option>
                {endpoints.map(ep => (
                  <option key={ep.id} value={ep.id}>
                    {ep.method} - {ep.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedEndpoint && (
              <>
                {/* Endpoint Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedEndpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                      selectedEndpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                      selectedEndpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedEndpoint.method}
                    </span>
                    <span className="text-sm font-mono text-gray-600">
                      {selectedEndpoint.url}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedEndpoint.description}</p>
                </div>

                {/* Headers */}
                {Object.keys(selectedEndpoint.headers).length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Headers</h4>
                    <div className="space-y-1">
                      {Object.entries(selectedEndpoint.headers).map(([key, value]) => (
                        <div key={key} className="text-xs font-mono bg-gray-100 p-2 rounded">
                          <span className="text-gray-700">{key}:</span> {value}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Request Body */}
                {(selectedEndpoint.method === 'POST' || selectedEndpoint.method === 'PUT') && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Body (JSON)
                    </label>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                      placeholder="Digite o JSON do body aqui..."
                    />
                  </div>
                )}

                {/* Test Button */}
                <button
                  onClick={handleTest}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Testando...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Testar Endpoint</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Response Panel */}
          <div className="w-1/2 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Resposta</h3>
            
            {!response && !error && !loading && (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <Code className="w-8 h-8 mx-auto mb-2" />
                  <p>Execute um teste para ver a resposta</p>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Executando requisição...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h4 className="text-sm font-medium text-red-800">Erro na Requisição</h4>
                </div>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {response && (
              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center space-x-2">
                  {response.status >= 200 && response.status < 300 ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    response.status >= 200 && response.status < 300
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {response.status} {response.statusText}
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{response.responseTime}ms</span>
                  </div>
                </div>

                {/* Response Headers */}
                {response.headers && Object.keys(response.headers).length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Headers de Resposta</h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {Object.entries(response.headers).map(([key, value]) => (
                        <div key={key} className="text-xs font-mono bg-gray-100 p-2 rounded">
                          <span className="text-gray-700">{key}:</span> {String(value)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Response Body */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Body da Resposta</h4>
                  <pre className="bg-gray-100 p-4 rounded-lg text-xs font-mono overflow-auto max-h-64">
                    {formatJSON(response.data)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};