import React, { useState } from 'react';
import { useContacts } from '../../hooks/useContacts';
import { ContactCard } from './ContactCard';
import { ContactModal } from './ContactModal';
import { SearchBar } from '../Common/SearchBar';
import { TagFilter } from '../Common/TagFilter';
import { Plus, Users } from 'lucide-react';

export const ContactsList: React.FC = () => {
  const {
    contacts,
    loading,
    searchTerm,
    setSearchTerm,
    selectedTags,
    setSelectedTags,
    addContact,
    updateContact,
    deleteContact,
    getAllTags
  } = useContacts();

  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleEditContact = (contact: any) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const handleSaveContact = (contactData: any) => {
    if (selectedContact) {
      updateContact(selectedContact.id, contactData);
    } else {
      addContact(contactData);
    }
    handleCloseModal();
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contatos</h1>
          <p className="text-gray-600">Gerencie seus contatos do WhatsApp</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Contato</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar contatos..."
            />
          </div>
          <div className="lg:w-64">
            <TagFilter
              availableTags={getAllTags()}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      {contacts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum contato encontrado
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedTags.length > 0 
              ? 'Tente ajustar os filtros de busca'
              : 'Adicione seu primeiro contato para começar'
            }
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Adicionar Contato
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={handleEditContact}
              onDelete={deleteContact}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <ContactModal
          contact={selectedContact}
          onClose={handleCloseModal}
          onSave={handleSaveContact}
        />
      )}
    </div>
  );
};