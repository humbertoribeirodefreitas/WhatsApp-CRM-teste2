export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  tags: string[];
  lastMessage?: string;
  lastMessageTime?: string;
  status: 'active' | 'inactive' | 'blocked' | 'pending';
  source: string;
  createdAt: string;
  notes?: string;
}

export interface Conversation {
  id: string;
  contactId: string;
  messages: Message[];
  status: 'open' | 'pending' | 'closed';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  trelloCard?: string;
}

export interface Message {
  id: string;
  content: string;
  type: 'text' | 'image' | 'document' | 'audio';
  direction: 'incoming' | 'outgoing';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: string[];
}

export interface TrelloCard {
  id: string;
  name: string;
  description: string;
  listId: string;
  listName: string;
  boardId: string;
  boardName: string;
  url: string;
  createdAt: string;
  dueDate?: string;
  labels: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'keyword' | 'time' | 'tag' | 'status_change';
    value: string;
    conditions?: Record<string, any>;
  };
  actions: Array<{
    type: 'send_message' | 'add_tag' | 'create_trello_card' | 'assign_agent';
    value: string;
    config?: Record<string, any>;
  }>;
  isActive: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalContacts: number;
  activeConversations: number;
  pendingTickets: number;
  responseTime: string;
  satisfactionRate: number;
  messagesPerDay: number;
  conversionRate: number;
}

export interface WebhookEvent {
  id: string;
  type: 'whatsapp_message' | 'trello_update' | 'contact_update' | 'custom';
  source: string;
  timestamp: string;
  data: any;
  processed: boolean;
  error?: string;
}

export interface APIEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: Record<string, string>;
  isActive: boolean;
  description: string;
  lastUsed?: string;
  responseTime?: number;
}

export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  secret: string;
  events: string[];
  isActive: boolean;
  createdAt: string;
  lastTriggered?: string;
}