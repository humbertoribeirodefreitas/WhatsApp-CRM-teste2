import { useState, useEffect } from 'react';
import { AutomationRule } from '../types';

const mockRules: AutomationRule[] = [
  {
    id: '1',
    name: 'Boas-vindas automática',
    description: 'Envia mensagem de boas-vindas para novos contatos',
    trigger: {
      type: 'keyword',
      value: 'oi',
      conditions: { isFirstMessage: true }
    },
    actions: [
      {
        type: 'send_message',
        value: 'Olá! Bem-vindo(a) ao nosso atendimento. Como posso ajudá-lo(a)?',
        config: { delay: 2000 }
      },
      {
        type: 'add_tag',
        value: 'Novo contato'
      }
    ],
    isActive: true,
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    name: 'Criar ticket para suporte',
    description: 'Cria automaticamente um card no Trello para questões de suporte',
    trigger: {
      type: 'keyword',
      value: 'suporte',
      conditions: { caseSensitive: false }
    },
    actions: [
      {
        type: 'create_trello_card',
        value: 'Suporte - {{contact.name}}',
        config: { 
          listId: '1',
          description: 'Solicitação de suporte via WhatsApp'
        }
      },
      {
        type: 'add_tag',
        value: 'Suporte'
      }
    ],
    isActive: true,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Follow-up de vendas',
    description: 'Acompanha leads que não responderam em 24h',
    trigger: {
      type: 'time',
      value: '24h',
      conditions: { lastMessageDirection: 'outgoing', noReply: true }
    },
    actions: [
      {
        type: 'send_message',
        value: 'Oi {{contact.name}}! Ainda tem interesse em nossos produtos? Estou aqui para ajudar! 😊'
      },
      {
        type: 'add_tag',
        value: 'Follow-up'
      }
    ],
    isActive: false,
    createdAt: '2024-01-10'
  }
];

export const useAutomation = () => {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setRules(mockRules);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addRule = (rule: Omit<AutomationRule, 'id' | 'createdAt'>) => {
    const newRule: AutomationRule = {
      ...rule,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setRules([...rules, newRule]);
  };

  const updateRule = (id: string, updates: Partial<AutomationRule>) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, ...updates } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  return {
    rules,
    loading,
    addRule,
    updateRule,
    deleteRule,
    toggleRule
  };
};