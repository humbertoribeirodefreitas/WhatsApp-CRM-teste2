import React, { useState } from 'react';
import { X, FileText, Calendar, Tag } from 'lucide-react';

interface CreateCardModalProps {
  onClose: () => void;
  onSave: (cardData: any) => void;
}

export const CreateCardModal: React.FC<CreateCardModalProps> = ({ 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    listId: '1',
    listName: 'A Fazer',
    boardId: '1',
    boardName: 'Suporte WhatsApp',
    dueDate: '',
    labels: [] as Array<{ id: string; name: string; color: string }>
  });

  const [newLabel, setNewLabel] = useState({ name: '', color: 'blue' });

  const availableLists = [
    { id: '1', name: 'A Fazer' },
    { id: '2', name: 'Em Andamento' },
    { id: '3', name: 'Concluído' }
  ];

  const availableColors = [
    { value: 'red', label: 'Vermelho' },
    { value: 'yellow', label: 'Amarelo' },
    { value: 'green', label: 'Verde' },
    { value: 'blue', label: 'Azul' },
    { value: 'purple', label: 'Roxo' },
    { value: 'orange', label: 'Laranja' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedList = availableLists.find(list => list.id === formData.listId);
    onSave({
      ...formData,
      listName: selectedList?.name || 'A Fazer'
    });
  };

  const handleAddLabel = () => {
    if (newLabel.name.trim()) {
      setFormData({
        ...formData,
        labels: [...formData.labels, {
          id: Date.now().toString(),
          name: newLabel.name,
          color: newLabel.color
        }]
      });
      setNewLabel({ name: '', color: 'blue' });
    }
  };

  const handleRemoveLabel = (labelId: string) => {
    setFormData({
      ...formData,
      labels: formData.labels.filter(label => label.id !== labelId)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Criar Card no Trello</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título do Card
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva o card..."
            />
          </div>

          {/* List */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lista
            </label>
            <select
              value={formData.listId}
              onChange={(e) => setFormData({ ...formData, listId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availableLists.map(list => (
                <option key={list.id} value={list.id}>{list.name}</option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Data de Vencimento
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Labels */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              Etiquetas
            </label>
            
            {/* Add new label */}
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newLabel.name}
                onChange={(e) => setNewLabel({ ...newLabel, name: e.target.value })}
                placeholder="Nome da etiqueta"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={newLabel.color}
                onChange={(e) => setNewLabel({ ...newLabel, color: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {availableColors.map(color => (
                  <option key={color.value} value={color.value}>{color.label}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddLabel}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                +
              </button>
            </div>

            {/* Existing labels */}
            <div className="flex flex-wrap gap-1">
              {formData.labels.map(label => (
                <span 
                  key={label.id} 
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${label.color}-100 text-${label.color}-800`}
                >
                  {label.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveLabel(label.id)}
                    className="ml-1 text-current hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
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
              Criar Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};