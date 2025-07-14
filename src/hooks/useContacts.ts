import { useState, useEffect } from 'react';
import { Contact } from '../types';

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Ana Silva',
    phone: '+55 11 99999-1234',
    email: 'ana.silva@email.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face',
    tags: ['Cliente VIP', 'Produto A'],
    lastMessage: 'Obrigada pelo atendimento!',
    lastMessageTime: '2 min',
    status: 'active',
    source: 'Website',
    createdAt: '2024-01-15',
    notes: 'Cliente premium interessado em produtos da linha A'
  },
  {
    id: '2',
    name: 'João Santos',
    phone: '+55 11 98888-5678',
    tags: ['Lead', 'Interessado'],
    lastMessage: 'Gostaria de mais informações sobre preços',
    lastMessageTime: '15 min',
    status: 'active',
    source: 'Instagram',
    createdAt: '2024-01-14',
    notes: 'Prospect qualificado, aguardando proposta'
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    phone: '+55 11 97777-9012',
    email: 'maria.oliveira@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face',
    tags: ['Cliente', 'Suporte'],
    lastMessage: 'Quando posso receber o produto?',
    lastMessageTime: '1h',
    status: 'pending',
    source: 'Facebook',
    createdAt: '2024-01-13',
    notes: 'Aguardando entrega do pedido #12345'
  }
];

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setContacts(mockContacts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm);
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => contact.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const addContact = (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setContacts([...contacts, newContact]);
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, ...updates } : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const getAllTags = () => {
    const tags = new Set<string>();
    contacts.forEach(contact => {
      contact.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  return {
    contacts: filteredContacts,
    loading,
    searchTerm,
    setSearchTerm,
    selectedTags,
    setSelectedTags,
    addContact,
    updateContact,
    deleteContact,
    getAllTags
  };
};