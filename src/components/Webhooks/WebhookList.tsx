import React, { useState } from 'react';
import { useWebhooks } from '../../hooks/useWebhooks';
import { WebhookCard } from './WebhookCard';
import { WebhookModal } from './WebhookModal';
import { WebhookLogs } from './WebhookLogs';
import { Plus, Webhook, Activity, Settings } from 'lucide-react';

export const WebhookList: React.FC = () => {
  const {
    webhooks,
    events,
    loading,
    addWebhook,
    updateWebhook,
    deleteWebhook,
    toggleWebhook
  } = useWebhooks();

  const [showModal, setShowModal] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState(null);

  const handleEditWebhook = (webhook: any) => {
    setSelectedWebhook(webhook);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWebhook(null);
  };

  const handleSaveWebhook = (webhookData: any) => {
    if (selectedWebhook) {
      updateWebhook(selectedWebhook.id, webhookData);
    } else {
      addWebhook(webhookData);
    }
    handleCloseModal();
  };

  const activeWebhooks = webhooks.filter(webhook => webhook.isActive);
  const inactiveWebhooks = webhooks.filter(webhook => !webhook.isActive);

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
          <h1 className="text-3xl font-bold text-gray-900">Webhooks & API</h1>
          <p className="text-gray-600">Configure integrações e endpoints para receber dados externos</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowLogs(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Activity className="w-4 h-4" />
            <span>Logs</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Webhook</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Webhooks</p>
              <p className="text-2xl font-bold text-gray-900">{webhooks.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Webhook className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ativos</p>
              <p className="text-2xl font-bold text-gray-900">{activeWebhooks.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Eventos Hoje</p>
              <p className="text-2xl font-bold text-gray-900">{events.filter(e => e.timestamp.startsWith(new Date().toISOString().split('T')[0])).length}</p>
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
              <p className="text-2xl font-bold text-gray-900">98.5%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Webhooks Section */}
      <div className="space-y-8">
        {/* Active Webhooks */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Webhooks Ativos</h2>
          {activeWebhooks.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Webhook className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Nenhum webhook ativo</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeWebhooks.map(webhook => (
                <WebhookCard
                  key={webhook.id}
                  webhook={webhook}
                  onEdit={handleEditWebhook}
                  onDelete={deleteWebhook}
                  onToggle={toggleWebhook}
                />
              ))}
            </div>
          )}
        </div>

        {/* Inactive Webhooks */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Webhooks Inativos</h2>
          {inactiveWebhooks.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Nenhum webhook inativo</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inactiveWebhooks.map(webhook => (
                <WebhookCard
                  key={webhook.id}
                  webhook={webhook}
                  onEdit={handleEditWebhook}
                  onDelete={deleteWebhook}
                  onToggle={toggleWebhook}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <WebhookModal
          webhook={selectedWebhook}
          onClose={handleCloseModal}
          onSave={handleSaveWebhook}
        />
      )}

      {showLogs && (
        <WebhookLogs
          events={events}
          onClose={() => setShowLogs(false)}
        />
      )}
    </div>
  );
};