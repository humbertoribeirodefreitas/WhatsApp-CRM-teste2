import React from 'react';
import { ConversationChart } from '../Dashboard/ConversationChart';

const Reports: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Relatórios</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <p className="text-center text-gray-500">Painel de relatórios e análises do WhatsApp CRM</p>
      </div>
      {/* Gráfico de conversas */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Conversas por Período</h2>
        <ConversationChart />
      </div>
      {/* Tabela de atendentes */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Atendentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversas</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempo Médio de Resposta</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">Ana Silva</td>
                <td className="px-4 py-2 whitespace-nowrap">120</td>
                <td className="px-4 py-2 whitespace-nowrap">2 min</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">João Santos</td>
                <td className="px-4 py-2 whitespace-nowrap">98</td>
                <td className="px-4 py-2 whitespace-nowrap">3 min</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">Maria Oliveira</td>
                <td className="px-4 py-2 whitespace-nowrap">87</td>
                <td className="px-4 py-2 whitespace-nowrap">2,5 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Relatório de novos contatos */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Novos Contatos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Novos Contatos</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">01/07/2024</td>
                <td className="px-4 py-2 whitespace-nowrap">12</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">02/07/2024</td>
                <td className="px-4 py-2 whitespace-nowrap">9</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">03/07/2024</td>
                <td className="px-4 py-2 whitespace-nowrap">15</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">04/07/2024</td>
                <td className="px-4 py-2 whitespace-nowrap">7</td>
              </tr>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap">05/07/2024</td>
                <td className="px-4 py-2 whitespace-nowrap">11</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports; 