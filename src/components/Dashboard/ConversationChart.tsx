import React from 'react';

export const ConversationChart: React.FC = () => {
  const data = [
    { day: 'Seg', conversations: 45 },
    { day: 'Ter', conversations: 52 },
    { day: 'Qua', conversations: 38 },
    { day: 'Qui', conversations: 65 },
    { day: 'Sex', conversations: 78 },
    { day: 'Sáb', conversations: 32 },
    { day: 'Dom', conversations: 28 }
  ];

  const maxConversations = Math.max(...data.map(d => d.conversations));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Conversas da Semana</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
          <span className="text-sm text-gray-600">Conversas</span>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden">
              <div 
                className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 flex items-end justify-center pb-2"
                style={{ height: `${(item.conversations / maxConversations) * 200}px` }}
              >
                <span className="text-xs font-medium text-white">
                  {item.conversations}
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-600 mt-2 font-medium">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};