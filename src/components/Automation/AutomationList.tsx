import React, { useState } from 'react';
import { useAutomation } from '../../hooks/useAutomation';
import { AutomationCard } from './AutomationCard';
import { AutomationModal } from './AutomationModal';
import { Plus, Zap, Play, Pause } from 'lucide-react';

export const AutomationList: React.FC = () => {
  const {
    rules,
    loading,
    addRule,
    updateRule,
    deleteRule,
    toggleRule
  } = useAutomation();

  const [showModal, setShowModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  const handleEditRule = (rule: any) => {
    setSelectedRule(rule);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRule(null);
  };

  const handleSaveRule = (ruleData: any) => {
    if (selectedRule) {
      updateRule(selectedRule.id, ruleData);
    } else {
      addRule(ruleData);
    }
    handleCloseModal();
  };

  const activeRules = rules.filter(rule => rule.isActive);
  const inactiveRules = rules.filter(rule => !rule.isActive);

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
          <h1 className="text-3xl font-bold text-gray-900">Automação</h1>
          <p className="text-gray-600">Configure regras automáticas para seu atendimento</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Regra</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Regras</p>
              <p className="text-2xl font-bold text-gray-900">{rules.length}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Regras Ativas</p>
              <p className="text-2xl font-bold text-gray-900">{activeRules.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Play className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Regras Inativas</p>
              <p className="text-2xl font-bold text-gray-900">{inactiveRules.length}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Pause className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Rules Section */}
      <div className="space-y-8">
        {/* Active Rules */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Regras Ativas</h2>
          {activeRules.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Play className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Nenhuma regra ativa</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeRules.map(rule => (
                <AutomationCard
                  key={rule.id}
                  rule={rule}
                  onEdit={handleEditRule}
                  onDelete={deleteRule}
                  onToggle={toggleRule}
                />
              ))}
            </div>
          )}
        </div>

        {/* Inactive Rules */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Regras Inativas</h2>
          {inactiveRules.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Pause className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Nenhuma regra inativa</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inactiveRules.map(rule => (
                <AutomationCard
                  key={rule.id}
                  rule={rule}
                  onEdit={handleEditRule}
                  onDelete={deleteRule}
                  onToggle={toggleRule}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AutomationModal
          rule={selectedRule}
          onClose={handleCloseModal}
          onSave={handleSaveRule}
        />
      )}
    </div>
  );
};