import React from 'react';
import { AutomationRule } from '../../types';
import { 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  MessageSquare,
  Tag,
  Clock,
  Zap
} from 'lucide-react';

interface AutomationCardProps {
  rule: AutomationRule;
  onEdit: (rule: AutomationRule) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export const AutomationCard: React.FC<AutomationCardProps> = ({
  rule,
  onEdit,
  onDelete,
  onToggle
}) => {
  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'keyword':
        return MessageSquare;
      case 'tag':
        return Tag;
      case 'time':
        return Clock;
      default:
        return Zap;
    }
  };

  const getTriggerLabel = (type: string) => {
    switch (type) {
      case 'keyword':
        return 'Palavra-chave';
      case 'tag':
        return 'Tag';
      case 'time':
        return 'Tempo';
      case 'status_change':
        return 'Mudança de Status';
      default:
        return 'Outro';
    }
  };

  const getActionLabel = (type: string) => {
    switch (type) {
      case 'send_message':
        return 'Enviar Mensagem';
      case 'add_tag':
        return 'Adicionar Tag';
      case 'create_trello_card':
        return 'Criar Card Trello';
      case 'assign_agent':
        return 'Designar Agente';
      default:
        return 'Ação';
    }
  };

  const TriggerIcon = getTriggerIcon(rule.trigger.type);

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 ${
      rule.isActive ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              rule.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {rule.isActive ? 'Ativa' : 'Inativa'}
            </span>
          </div>
          <p className="text-sm text-gray-600">{rule.description}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onToggle(rule.id)}
            className={`p-2 rounded-lg transition-colors ${
              rule.isActive
                ? 'text-green-600 hover:bg-green-50'
                : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            {rule.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onEdit(rule)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(rule.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trigger */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <TriggerIcon className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">
            {getTriggerLabel(rule.trigger.type)}
          </span>
        </div>
        <p className="text-sm text-blue-700">
          {rule.trigger.type === 'keyword' && `Palavra: "${rule.trigger.value}"`}
          {rule.trigger.type === 'tag' && `Tag: "${rule.trigger.value}"`}
          {rule.trigger.type === 'time' && `Tempo: ${rule.trigger.value}`}
          {rule.trigger.type === 'status_change' && `Status: ${rule.trigger.value}`}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-900">Ações:</h4>
        {rule.actions.map((action, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>{getActionLabel(action.type)}</span>
            {action.value && (
              <span className="text-gray-500">: {action.value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Criado em {rule.createdAt}</span>
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>{rule.actions.length} ações</span>
          </div>
        </div>
      </div>
    </div>
  );
};