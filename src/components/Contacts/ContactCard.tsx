import React from 'react';
import { Contact } from '../../types';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Edit, 
  Trash2, 
  Clock,
  Tag,
  User
} from 'lucide-react';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ 
  contact, 
  onEdit, 
  onDelete 
}) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    blocked: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    active: 'Ativo',
    inactive: 'Inativo',
    blocked: 'Bloqueado'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {contact.avatar ? (
            <img 
              src={contact.avatar} 
              alt={contact.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              statusColors[contact.status]
            }`}>
              {statusLabels[contact.status]}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(contact)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span className="text-sm">{contact.phone}</span>
        </div>
        {contact.email && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{contact.email}</span>
          </div>
        )}
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Cadastrado em {contact.createdAt}</span>
        </div>
      </div>

      {/* Tags */}
      {contact.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {contact.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Last Message */}
      {contact.lastMessage && (
        <div className="border-t pt-4">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2">{contact.lastMessage}</p>
        </div>
      )}

      {/* Notes */}
      {contact.notes && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 line-clamp-3">{contact.notes}</p>
        </div>
      )}
    </div>
  );
};