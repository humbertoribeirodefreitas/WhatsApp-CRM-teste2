import { useState, useEffect } from 'react';
import { APIEndpoint } from '../types';

const mockEndpoints: APIEndpoint[] = [
  {
    id: '1',
    name: 'WhatsApp Send Message',
    url: 'https://graph.facebook.com/v17.0/PHONE_NUMBER_ID/messages',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json'
    },
    isActive: true,
    description: 'Enviar mensagem via WhatsApp Business API',
    lastUsed: '2024-01-16T14:30:00Z',
    responseTime: 245
  },
  {
    id: '2',
    name: 'Trello Create Card',
    url: 'https://api.trello.com/1/cards',
    method: 'POST',
    headers: {
      'Authorization': 'OAuth oauth_consumer_key="YOUR_KEY"'
    },
    isActive: true,
    description: 'Criar novo card no Trello',
    lastUsed: '2024-01-16T12:15:00Z',
    responseTime: 180
  },
  {
    id: '3',
    name: 'External CRM Sync',
    url: 'https://external-crm.com/api/contacts',
    method: 'GET',
    headers: {
      'X-API-Key': 'your-api-key-here',
      'Accept': 'application/json'
    },
    isActive: false,
    description: 'Sincronizar contatos com CRM externo',
    responseTime: 320
  },
  {
    id: '4',
    name: 'Webhook Notification',
    url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    isActive: true,
    description: 'Enviar notificações para Slack',
    lastUsed: '2024-01-16T10:45:00Z',
    responseTime: 95
  }
];

export const useAPI = () => {
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setEndpoints(mockEndpoints);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addEndpoint = (endpoint: Omit<APIEndpoint, 'id'>) => {
    const newEndpoint: APIEndpoint = {
      ...endpoint,
      id: Date.now().toString()
    };
    setEndpoints([...endpoints, newEndpoint]);
  };

  const updateEndpoint = (id: string, updates: Partial<APIEndpoint>) => {
    setEndpoints(endpoints.map(endpoint => 
      endpoint.id === id ? { ...endpoint, ...updates } : endpoint
    ));
  };

  const deleteEndpoint = (id: string) => {
    setEndpoints(endpoints.filter(endpoint => endpoint.id !== id));
  };

  const toggleEndpoint = (id: string) => {
    setEndpoints(endpoints.map(endpoint => 
      endpoint.id === id ? { ...endpoint, isActive: !endpoint.isActive } : endpoint
    ));
  };

  const testEndpoint = async (endpoint: APIEndpoint, body?: string): Promise<any> => {
    const startTime = Date.now();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
      
      const responseTime = Date.now() - startTime;
      
      // Update endpoint with last used time and response time
      updateEndpoint(endpoint.id, {
        lastUsed: new Date().toISOString(),
        responseTime
      });

      // Mock successful response
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        responseTime,
        headers: {
          'content-type': 'application/json',
          'x-ratelimit-remaining': '99'
        },
        data: {
          success: true,
          message: 'Request completed successfully',
          timestamp: new Date().toISOString(),
          endpoint: endpoint.name,
          method: endpoint.method
        }
      };

      // Simulate occasional errors
      if (Math.random() < 0.1) {
        throw new Error('Network timeout - please try again');
      }

      return mockResponse;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      // Mock error response
      return {
        status: 500,
        statusText: 'Internal Server Error',
        responseTime,
        headers: {},
        data: {
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }
      };
    }
  };

  return {
    endpoints,
    loading,
    addEndpoint,
    updateEndpoint,
    deleteEndpoint,
    toggleEndpoint,
    testEndpoint
  };
};