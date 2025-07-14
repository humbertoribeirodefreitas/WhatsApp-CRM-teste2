import { useState, useEffect } from 'react';
import { WebhookConfig, WebhookEvent } from '../types';

const mockWebhooks: WebhookConfig[] = [
  {
    id: '1',
    name: 'WhatsApp Business API',
    url: 'https://api.whatsapp.com/webhook',
    secret: 'wh_secret_abc123def456ghi789',
    events: ['whatsapp.message.received', 'whatsapp.status.updated'],
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    lastTriggered: '2024-01-16T14:22:00Z'
  },
  {
    id: '2',
    name: 'Trello Integration',
    url: 'https://api.trello.com/webhook',
    secret: 'tr_secret_xyz789abc123def456',
    events: ['trello.card.created', 'trello.card.updated'],
    isActive: true,
    createdAt: '2024-01-14T16:45:00Z',
    lastTriggered: '2024-01-16T12:15:00Z'
  },
  {
    id: '3',
    name: 'CRM External API',
    url: 'https://external-crm.com/api/webhook',
    secret: 'crm_secret_def456ghi789jkl012',
    events: ['contact.created', 'contact.updated', 'conversation.started'],
    isActive: false,
    createdAt: '2024-01-10T09:20:00Z'
  }
];

const mockEvents: WebhookEvent[] = [
  {
    id: '1',
    type: 'whatsapp_message',
    source: 'WhatsApp Business API',
    timestamp: '2024-01-16T14:22:00Z',
    data: {
      from: '+5511999999999',
      message: 'Olá, preciso de ajuda!',
      messageId: 'msg_123456'
    },
    processed: true
  },
  {
    id: '2',
    type: 'trello_update',
    source: 'Trello Integration',
    timestamp: '2024-01-16T12:15:00Z',
    data: {
      cardId: 'card_789',
      action: 'updated',
      listName: 'Em Andamento'
    },
    processed: true
  },
  {
    id: '3',
    type: 'contact_update',
    source: 'CRM External API',
    timestamp: '2024-01-16T11:30:00Z',
    data: {
      contactId: 'contact_456',
      changes: ['phone', 'email']
    },
    processed: false,
    error: 'Webhook endpoint not responding'
  },
  {
    id: '4',
    type: 'whatsapp_message',
    source: 'WhatsApp Business API',
    timestamp: '2024-01-16T10:45:00Z',
    data: {
      from: '+5511888888888',
      message: 'Gostaria de fazer um pedido',
      messageId: 'msg_789012'
    },
    processed: true
  },
  {
    id: '5',
    type: 'automation_triggered',
    source: 'Internal System',
    timestamp: '2024-01-16T09:20:00Z',
    data: {
      ruleId: 'rule_123',
      contactId: 'contact_789',
      action: 'send_welcome_message'
    },
    processed: true
  }
];

export const useWebhooks = () => {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setWebhooks(mockWebhooks);
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addWebhook = (webhook: Omit<WebhookConfig, 'id' | 'createdAt'>) => {
    const newWebhook: WebhookConfig = {
      ...webhook,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setWebhooks([...webhooks, newWebhook]);
  };

  const updateWebhook = (id: string, updates: Partial<WebhookConfig>) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id ? { ...webhook, ...updates } : webhook
    ));
  };

  const deleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
  };

  const toggleWebhook = (id: string) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id ? { ...webhook, isActive: !webhook.isActive } : webhook
    ));
  };

  const processWebhookEvent = (eventData: Omit<WebhookEvent, 'id' | 'timestamp'>) => {
    const newEvent: WebhookEvent = {
      ...eventData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setEvents([newEvent, ...events]);
    return newEvent;
  };

  return {
    webhooks,
    events,
    loading,
    addWebhook,
    updateWebhook,
    deleteWebhook,
    toggleWebhook,
    processWebhookEvent
  };
};