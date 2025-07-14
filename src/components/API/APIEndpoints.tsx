import React, { useState } from 'react';
import { useAPI } from '../../hooks/useAPI';
import { APICard } from './APICard';
import { APIModal } from './APIModal';
import { APITester } from './APITester';
import { Plus, Code, Activity, Settings } from 'lucide-react';

export const APIEndpoints: React.FC = () => {
  const {
    endpoints,
    loading,
    addEndpoint,
    updateEndpoint,
    deleteEndpoint,
    toggleEndpoint,
    testEndpoint
  } = useAPI();

  const [showModal, setShowModal] = useState(false);
  const [showTester, setShowTester] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  const handleEditEndpoint = (endpoint: any) => {
    setSelectedEndpoint(endpoint);
    setShowModal(true);
  };

  const handleTestEndpoint = (endpoint: any) => {
    setSelectedEndpoint(endpoint);
    setShowTester(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEndpoint(null);
  };

  const handleCloseTester = () => {
    setShowTester(false);
    setSelectedEndpoint(null);
  };

  const handleSaveEndpoint = (endpointData: any) => {
    if (selectedEndpoint) {
      updateEndpoint(selectedEndpoint.id, endpointData);
    } else {
      addEndpoint(endpointData);
    }
    handleCloseModal();
  };

  const activeEndpoints = endpoints.filter(endpoint => endpoint.isActive);
  const inactiveEndpoints = endpoints.filter(endpoint => !endpoint.isActive);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 h-32">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Endpoints</h1>
          <p className="text-gray-600">Configure endpoints para integração com APIs externas</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowTester(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Activity className="w-4 h-4" />
            <span>Testar API</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Endpoint</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Endpoints</p>
              <p className="text-2xl font-bold text-gray-900">{endpoints.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ativos</p>
              <p className="text-2xl font-bold text-gray-900">{activeEndpoints.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tempo Médio</p>
              <p className="text-2xl font-bold text-gray-900">
                {endpoints.length > 0 
                  ? Math.round(endpoints.reduce((acc, e) => acc + (e.responseTime || 0), 0) / endpoints.length)
                  : 0
                }ms
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Sucesso</p>
              <p className="text-2xl font-bold text-gray-900">99.2%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Endpoints Section */}
      <div className="space-y-8">
        {/* Active Endpoints */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Endpoints Ativos</h2>
          {activeEndpoints.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Code className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Nenhum endpoint ativo</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeEndpoints.map(endpoint => (
                <APICard
                  key={endpoint.id}
                  endpoint={endpoint}
                  onEdit={handleEditEndpoint}
                  onDelete={deleteEndpoint}
                  onToggle={toggleEndpoint}
                  onTest={handleTestEndpoint}
                />
              ))}
            </div>
          )}
        </div>

        {/* Inactive Endpoints */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Endpoints Inativos</h2>
          {inactiveEndpoints.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Nenhum endpoint inativo</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inactiveEndpoints.map(endpoint => (
                <APICard
                  key={endpoint.id}
                  endpoint={endpoint}
                  onEdit={handleEditEndpoint}
                  onDelete={deleteEndpoint}
                  onToggle={toggleEndpoint}
                  onTest={handleTestEndpoint}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <APIModal
          endpoint={selectedEndpoint}
          onClose={handleCloseModal}
          onSave={handleSaveEndpoint}
        />
      )}

      {showTester && (
        <APITester
          endpoint={selectedEndpoint}
          endpoints={endpoints}
          onClose={handleCloseTester}
          onTest={testEndpoint}
        />
      )}
    </div>
  );
};