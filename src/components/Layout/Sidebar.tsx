import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Trello, 
  Zap, 
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Webhook,
  Code
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'contacts', label: 'Contatos', icon: Users },
  { id: 'conversations', label: 'Conversas', icon: MessageSquare },
  { id: 'trello', label: 'Trello', icon: Trello },
  { id: 'automation', label: 'Automação', icon: Zap },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook },
  { id: 'api', label: 'API', icon: Code },
  { id: 'analytics', label: 'Análises', icon: BarChart3 },
  { id: 'settings', label: 'Configurações', icon: Settings }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse
}) => {
  return (
    <div className={`bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">WhatsApp CRM</span>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-green-600 text-white shadow-lg' 
                      : 'hover:bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <div>
              <div className="text-sm font-medium">Admin</div>
              <div className="text-xs text-slate-400">admin@empresa.com</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};