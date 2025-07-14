import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ContactsList } from './components/Contacts/ContactsList';
import { TrelloBoard } from './components/Trello/TrelloBoard';
import { AutomationList } from './components/Automation/AutomationList';
import { WebhookList } from './components/Webhooks/WebhookList';
import { APIEndpoints } from './components/API/APIEndpoints';
import Reports from './components/Reports/Reports';
import Settings from './components/Settings/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'contacts':
        return <ContactsList />;
      case 'conversations':
        return (
          <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Conversas</h1>
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-gray-600">Módulo de conversas em desenvolvimento</p>
            </div>
          </div>
        );
      case 'trello':
        return <TrelloBoard />;
      case 'automation':
        return <AutomationList />;
      case 'webhooks':
        return <WebhookList />;
      case 'api':
        return <APIEndpoints />;
      case 'analytics':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;