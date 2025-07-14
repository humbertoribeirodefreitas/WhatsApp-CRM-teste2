import React from 'react';
import { TrelloCard } from '../../types';
import { TrelloCardComponent } from './TrelloCardComponent';
import { Plus, MoreHorizontal } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface TrelloListProps {
  list: {
    id: string;
    name: string;
    color: string;
  };
  cards: TrelloCard[];
  onUpdateCard: (id: string, updates: Partial<TrelloCard>) => void;
  onDeleteCard: (id: string) => void;
}

export const TrelloList: React.FC<TrelloListProps> = ({
  list,
  cards,
  onUpdateCard,
  onDeleteCard
}) => {
  const { setNodeRef } = useDroppable({
    id: list.id,
  });

  const cardIds = cards.map(card => card.id);

  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-gray-100 rounded-xl shadow-lg">
        {/* List Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${list.color.replace('bg-', 'bg-').replace('-100', '-500')}`}></div>
              <h3 className="font-semibold text-gray-900">{list.name}</h3>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {cards.length}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1 hover:bg-gray-200 rounded">
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-200 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Cards Container */}
        <div
          ref={setNodeRef}
          className="p-3 min-h-[200px] max-h-[calc(100vh-300px)] overflow-y-auto"
        >
          <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {cards.map(card => (
                <TrelloCardComponent
                  key={card.id}
                  card={card}
                  onUpdate={onUpdateCard}
                  onDelete={onDeleteCard}
                />
              ))}
              {cards.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">Arraste um card aqui</p>
                  <p className="text-xs mt-1">ou clique em + para criar</p>
                </div>
              )}
            </div>
          </SortableContext>
        </div>
      </div>
    </div>
  );
};