import React from 'react';
import { Tag, X } from 'lucide-react';

interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  availableTags,
  selectedTags,
  onTagsChange
}) => {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 flex items-center">
          <Tag className="w-4 h-4 mr-1" />
          Filtrar por tags
        </label>
        {selectedTags.length > 0 && (
          <button
            onClick={clearAllTags}
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
          >
            <X className="w-3 h-3 mr-1" />
            Limpar
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-1">
        {availableTags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagToggle(tag)}
            className={`px-2 py-1 text-xs rounded-full border transition-colors ${
              selectedTags.includes(tag)
                ? 'bg-green-100 border-green-500 text-green-800'
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};