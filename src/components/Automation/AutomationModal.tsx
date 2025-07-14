import React, { useState, useEffect } from 'react';
import { AutomationRule } from '../../types';
import { X, Plus, Trash2 } from 'lucide-react';

interface AutomationModalProps {
  rule: AutomationRule | null;
  onClose: () => void;
  onSave: (rule: Omit<AutomationRule, 'id' | 'createdAt'>) => void;
}

export const AutomationModal: React.FC<AutomationModalProps> = ({ 
  rule, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    trigger: {
      type: 'keyword' as const,
      value: '',
      conditions: {}
    },
    actions: [
      {
        type: 'send_message' as const,
        value: '',
        config: {}
      }
    ],
    isActive: true
  });

  useEffect(() => {
    if (rule) {
      setFormData({
        name: rule.name,
        description: rule.description,
        trigger: rule.trigger,
        actions: rule.actions,
        isActive: rule.isActive
      });
    }
  }, [rule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addAction = () => {
    setFormData({
      ...formData,
      actions: [...formData.actions, {
        type: 'send_message',
        value: '',
        config: {}
      }]
    });
  };

  const removeAction = (index: number) => {
    setFormData({
      ...formData,
      actions: formData.actions.filter((_, i) => i !== index)
    });
  };

  const updateAction = (index: number, field: string, value: string) => {
    const newActions = [...formData.actions];
    newActions[index] = { ...newActions[index], [field]: value };
    setFormData({ ...formData, actions: newActions });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {rule ? 'Editar Regra' : 'Nova Regra de Automação'}
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
                Nome da Regra
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Descreva o que esta regra faz..."
                required
              />
            </div>
          </div>

          {/* Trigger */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Gatilho</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Gatilho
                </label>
                <select
                  value={formData.trigger.type}
                  onChange={(e) => setFormData({
                    ...formData,
                    trigger: { ...formData.trigger, type: e.target.value as any }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="keyword">Palavra-chave</option>
                  <option value="tag">Tag</option>
                  <option value="time">Tempo</option>
                  <option value="status_change">Mudança de Status</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor
                </label>
                <input
                  type="text"
                  value={formData.trigger.value}
                  onChange={(e) => setFormData({
                    ...formData,
                    trigger: { ...formData.trigger, value: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder={
                    formData.trigger.type === 'keyword' ? 'Ex: oi, help, suporte' :
                    formData.trigger.type === 'tag' ? 'Ex: VIP, Lead' :
                    formData.trigger.type === 'time' ? 'Ex: 24h, 1d' :
                    'Ex: pending, active'
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Ações</h3>
              <button
                type="button"
                onClick={addAction}
                className="flex items-center space-x-2 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Ação</span>
              </button>
            </div>

            {formData.actions.map((action, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    Ação {index + 1}
                  </span>
                  {formData.actions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAction(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo
                    </label>
                    <select
                      value={action.type}
                      onChange={(e) => updateAction(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="send_message">Enviar Mensagem</option>
                      <option value="add_tag">Adicionar Tag</option>
                      <option value="create_trello_card">Criar Card Trello</option>
                      <option value="assign_agent">Designar Agente</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor
                    </label>
                    <input
                      type="text"
                      value={action.value}
                      onChange={(e) => updateAction(index, 'value', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder={
                        action.type === 'send_message' ? 'Mensagem a ser enviada' :
                        action.type === 'add_tag' ? 'Nome da tag' :
                        action.type === 'create_trello_card' ? 'Título do card' :
                        'Nome do agente'
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Ativar regra imediatamente
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
              className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Salvar Regra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};