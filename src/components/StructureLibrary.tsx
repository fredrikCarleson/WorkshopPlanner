import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { liberatingStructures, getCategoryColor } from '../data/liberatingStructures';
import { StructureCard } from './StructureCard';

export const StructureLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Foundation', 'Planning', 'Deciding', 'Connecting', 'Learning'];
  
  const filteredStructures = liberatingStructures.filter(structure => {
    const matchesSearch = structure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         structure.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || structure.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Liberating Structures-bibliotek</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Sök metoder..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'All' ? 'Alla kategorier' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStructures.map(structure => (
          <StructureCard 
            key={structure.id} 
            structure={structure} 
            showDetails={true}
          />
        ))}
      </div>
      
      {filteredStructures.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Inga metoder hittades för din sökning.</p>
        </div>
      )}
    </div>
  );
};