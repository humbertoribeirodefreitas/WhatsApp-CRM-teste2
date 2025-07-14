import React from 'react';
import { MessageSquare, UserPlus, CheckCircle, TrendingUp } from 'lucide-react';

export const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'message',
      icon: MessageSquare,
      title: 'Nova mensagem de Ana Silva',
      description: 'Obrigada pelo atendimento!',
      time: '2 min atrás',
      color: 'blue'
    },
    {
      id: 2,
      type: 'contact',
      icon: UserPlus,
      title: 'Novo contato adicionado',
      description: 'João Santos (+55 11 98888-5678)',
      time: '15 min atrás',
      color: 'green'
    },
    {
      id: 3,
      type: 'task',
      icon: CheckCircle,
      title: 'Ticket resolvido no Trello',
      description: 'Suporte - Maria Oliveira',
      time: '1 hora atrás',
      color: 'purple'
    },
    {
      id: 4,
      type: 'automation',
      icon: TrendingUp,
      title: 'Automação executada',
      description: 'Boas-vindas enviada para 3 novos contatos',
      time: '2 horas atrás',
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
      <div className="space-y-4">
        {activities.map(activity => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${colorClasses[activity.color as keyof typeof colorClasses]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};