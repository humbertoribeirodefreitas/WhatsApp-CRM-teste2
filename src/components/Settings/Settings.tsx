import React, { useState } from 'react';

const idiomas = [
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en-US', label: 'English (US)' }
];

const Settings: React.FC = () => {
  const [empresa, setEmpresa] = useState('Minha Empresa');
  const [idioma, setIdioma] = useState('pt-BR');
  const [senha, setSenha] = useState('');
  const [notificacoes, setNotificacoes] = useState(true);
  const [salvo, setSalvo] = useState(false);

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Configurações</h1>
      <form onSubmit={handleSalvar} className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome da empresa</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={empresa}
            onChange={e => setEmpresa(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={idioma}
            onChange={e => setIdioma(e.target.value)}
          >
            {idiomas.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alterar senha</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Nova senha"
          />
        </div>
        <div className="flex items-center">
          <input
            id="notificacoes"
            type="checkbox"
            checked={notificacoes}
            onChange={e => setNotificacoes(e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="notificacoes" className="ml-2 block text-sm text-gray-700">
            Receber notificações por e-mail
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Salvar
        </button>
        {salvo && (
          <div className="text-green-600 text-center font-medium mt-2">Configurações salvas!</div>
        )}
      </form>
    </div>
  );
};

export default Settings; 