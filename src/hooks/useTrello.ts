import { useState, useEffect } from 'react';
import { TrelloCard } from '../types';

const mockLists = [
  { id: '1', name: 'A Fazer', color: 'bg-gray-100' },
  { id: '2', name: 'Em Andamento', color: 'bg-yellow-100' },
  { id: '3', name: 'Concluído', color: 'bg-green-100' }
];

const mockTrelloCards: TrelloCard[] = [
  {
    id: '1',
    name: 'Suporte - Ana Silva',
    description: 'Cliente VIP com dúvidas sobre produto A. Precisa de atendimento prioritário.',
    listId: '2',
    listName: 'Em Andamento',
    boardId: '1',
    boardName: 'Suporte WhatsApp',
    url: 'https://trello.com/c/abc123',
    createdAt: '2024-01-15T10:30:00Z',
    dueDate: '2024-01-16T18:00:00Z',
    labels: [
      { id: '1', name: 'Urgente', color: 'red' },
      { id: '2', name: 'VIP', color: 'yellow' }
    ]
  },
  {
    id: '2',
    name: 'Vendas - João Santos',
    description: 'Prospect interessado em proposta comercial para produto B',
    listId: '1',
    listName: 'A Fazer',
    boardId: '1',
    boardName: 'Suporte WhatsApp',
    url: 'https://trello.com/c/def456',
    createdAt: '2024-01-14T14:20:00Z',
    dueDate: '2024-01-18T17:00:00Z',
    labels: [
      { id: '3', name: 'Vendas', color: 'green' }
    ]
  },
  {
    id: '3',
    name: 'Bug Report - Sistema',
    description: 'Erro no sistema de envio de mensagens automáticas',
    listId: '2',
    listName: 'Em Andamento',
    boardId: '1',
    boardName: 'Suporte WhatsApp',
    url: 'https://trello.com/c/ghi789',
    createdAt: '2024-01-13T09:15:00Z',
    dueDate: '2024-01-15T12:00:00Z',
    labels: [
      { id: '4', name: 'Bug', color: 'red' },
      { id: '5', name: 'Sistema', color: 'blue' }
    ]
  },
  {
    id: '4',
    name: 'Treinamento - Equipe',
    description: 'Treinamento da equipe sobre novas funcionalidades do CRM',
    listId: '3',
    listName: 'Concluído',
    boardId: '1',
    boardName: 'Suporte WhatsApp',
    url: 'https://trello.com/c/jkl012',
    createdAt: '2024-01-10T16:45:00Z',
    labels: [
      { id: '6', name: 'Treinamento', color: 'purple' }
    ]
  },
  {
    id: '5',
    name: 'Integração API',
    description: 'Implementar nova integração com API do WhatsApp Business',
    listId: '1',
    listName: 'A Fazer',
    boardId: '1',
    boardName: 'Suporte WhatsApp',
    url: 'https://trello.com/c/mno345',
    createdAt: '2024-01-12T11:30:00Z',
    dueDate: '2024-01-20T15:00:00Z',
    labels: [
      { id: '7', name: 'Desenvolvimento', color: 'blue' },
      { id: '8', name: 'API', color: 'orange' }
    ]
  }
];

export const useTrello = () => {
  const [cards, setCards] = useState<TrelloCard[]>([]);
  const [lists] = useState(mockLists);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCards(mockTrelloCards);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const createCard = (cardData: Omit<TrelloCard, 'id' | 'createdAt' | 'url'>) => {
    const newCard: TrelloCard = {
      ...cardData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      url: `https://trello.com/c/${Math.random().toString(36).substr(2, 9)}`
    };
    setCards([...cards, newCard]);
    return newCard;
  };

  const updateCard = (id: string, updates: Partial<TrelloCard>) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, ...updates } : card
    ));
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const moveCard = (cardId: string, newListId: string, newPosition: number) => {
    setCards(prevCards => {
      const cardToMove = prevCards.find(card => card.id === cardId);
      if (!cardToMove) return prevCards;

      const newList = lists.find(list => list.id === newListId);
      if (!newList) return prevCards;

      return prevCards.map(card =>
        card.id === cardId
          ? { ...card, listId: newListId, listName: newList.name }
          : card
      );
    });
  };

  return {
    cards,
    lists,
    loading,
    createCard,
    updateCard,
    deleteCard,
    moveCard
  };
};