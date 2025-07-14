import React, { useState } from 'react';
import { useTrello } from '../../hooks/useTrello';
import { TrelloList } from './TrelloList';
import { CreateCardModal } from './CreateCardModal';
import { Plus, ExternalLink, Trello } from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { TrelloCardComponent } from './TrelloCardComponent';

export const TrelloBoard: React.FC = () => {
  const { cards, lists, loading, createCard, updateCard, deleteCard, moveCard } = useTrello();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const card = cards.find(c => c.id === active.id);
    setActiveCard(card || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the containers
    const activeCard = cards.find(c => c.id === activeId);
    const overCard = cards.find(c => c.id === overId);
    
    if (!activeCard) return;

    // If dropping over a list
    if (lists.find(list => list.id === overId)) {
      if (activeCard.listId !== overId) {
        moveCard(activeId as string, overId as string, 0);
      }
      return;
    }

    // If dropping over a card
    if (overCard && activeCard.listId !== overCard.listId) {
      moveCard(activeId as string, overCard.listId, 0);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeCard = cards.find(c => c.id === activeId);
    const overCard = cards.find(c => c.id === overId);

    if (!activeCard) return;

    // If dropping over a list
    if (lists.find(list => list.id === overId)) {
      if (activeCard.listId !== overId) {
        moveCard(activeId as string, overId as string, 0);
      }
      return;
    }

    // If dropping over a card in the same list, reorder
    if (overCard && activeCard.listId === overCard.listId) {
      const listCards = cards.filter(c => c.listId === activeCard.listId);
      const oldIndex = listCards.findIndex(c => c.id === activeId);
      const newIndex = listCards.findIndex(c => c.id === overId);
      
      if (oldIndex !== newIndex) {
        // This would require implementing card ordering in the backend
        console.log('Reordering cards within list');
      }
    }
  };

  const handleCreateCard = (cardData: any) => {
    createCard(cardData);
    setShowCreateModal(false);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 h-96">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-20 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Board Trello</h1>
          <p className="text-gray-600">Gerencie seus tickets e tarefas</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Card</span>
          </button>
          <a
            href="https://trello.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-lg"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Abrir Trello</span>
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Cards</p>
              <p className="text-2xl font-bold text-gray-900">{cards.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Trello className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        {lists.map(list => (
          <div key={list.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{list.name}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {cards.filter(card => card.listId === list.id).length}
                </p>
              </div>
              <div className={`p-3 rounded-full ${list.color}`}>
                <div className="w-6 h-6 bg-current rounded-full opacity-80"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {lists.map(list => (
            <TrelloList
              key={list.id}
              list={list}
              cards={cards.filter(card => card.listId === list.id)}
              onUpdateCard={updateCard}
              onDeleteCard={deleteCard}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className="rotate-3 opacity-90">
              <TrelloCardComponent
                card={activeCard}
                onUpdate={() => {}}
                onDelete={() => {}}
                isDragging={true}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateCardModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateCard}
        />
      )}
    </div>
  );
};