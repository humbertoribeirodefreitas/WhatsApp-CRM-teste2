import React from 'react';
import { TrelloCard } from '../../types';
import { 
  ExternalLink, 
  Edit, 
  Trash2, 
  Calendar, 
  Tag,
  Clock,
  GripVertical
} from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TrelloCardProps {
  card: TrelloCard;
  onUpdate: (id: string, updates: Partial<TrelloCard>) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

export const TrelloCardComponent: React.FC<TrelloCardProps> = ({ 
  card, 
  onUpdate, 
  onDelete,
  isDragging = false
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: card.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getLabelColor = (color: string) => {
    const colors = {
      red: 'bg-red-100 text-red-800 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group ${
        isSortableDragging || isDragging ? 'opacity-50 rotate-3 scale-105 shadow-xl' : ''
      }`}
      {...attributes}
    >
      {/* Card Header with Drag Handle */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1">
              {card.name}
            </h4>
            {card.description && (
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {card.description}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              {...listeners}
              className="p-1 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="w-3 h-3 text-gray-400" />
            </button>
            <a
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-gray-100 rounded"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(card.id);
              }}
              className="p-1 hover:bg-red-50 hover:text-red-600 rounded"
            >
              <Trash2 className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Labels */}
        {card.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {card.labels.map(label => (
              <span 
                key={label.id} 
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                  getLabelColor(label.color)
                }`}
              >
                <Tag className="w-2 h-2 mr-1" />
                {label.name}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatDate(card.createdAt)}</span>
          </div>
          
          {card.dueDate && (
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
              isOverdue(card.dueDate) 
                ? 'bg-red-100 text-red-700' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              <Calendar className="w-3 h-3" />
              <span>{formatDate(card.dueDate)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};