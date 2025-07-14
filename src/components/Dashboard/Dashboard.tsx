import React from 'react';
import { StatsCard } from './StatsCard';
import { RecentActivity } from './RecentActivity';
import { ConversationChart } from './ConversationChart';
import { 
  Users, 
  MessageSquare, 
  Clock, 
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total de Contatos',
      value: '1,234',
      icon: Users,
      change: '+12% vs mês passado',
      changeType: 'positive' as const,
      color: 'blue' as const
    },
    {
      title: 'Conversas Ativas',
      value: '89',
      icon: MessageSquare,
      change: '+5% vs ontem',
      changeType: 'positive' as const,
      color: 'green' as const
    },
    {
      title: 'Tempo de Resposta',
      value: '2.3 min',
      icon: Clock,
      change: '-15% vs semana passada',
      changeType: 'positive' as const,
      color: 'purple' as const
    },
    {
      title: 'Taxa de Conversão',
      value: '24.5%',
      icon: TrendingUp,
      change: '+8% vs mês passado',
      changeType: 'positive' as const,
      color: 'orange' as const
    }
  ];

  const pendingTasks = [
    { id: 1, title: 'Responder Ana Silva', priority: 'high', time: '5 min' },
    { id: 2, title: 'Seguir up João Santos', priority: 'medium', time: '15 min' },
    { id: 3, title: 'Atualizar Trello - Suporte', priority: 'low', time: '30 min' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu atendimento WhatsApp</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation Chart */}
        <div className="lg:col-span-2">
          <ConversationChart />
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tarefas Pendentes</h3>
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-3">
            {pendingTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <span className="text-sm font-medium text-gray-900">{task.title}</span>
                </div>
                <span className="text-xs text-gray-500">{task.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <RecentActivity />
      </div>
    </div>
  );
};