import { useState } from 'react';
import { 
  FiSearch, FiArrowLeft, FiEye, FiEdit3, FiInfo, 
  FiFilter, FiGrid, FiList
} from 'react-icons/fi';

const CATEGORIES = [
  { id: 'all', name: 'All Templates', count: 25 },
  { id: 'business', name: 'Business', count: 8 },
  { id: 'portfolio', name: 'Portfolio', count: 6 },
  { id: 'restaurant', name: 'Restaurant', count: 5 },
  { id: 'medical', name: 'Medical', count: 4 },
  { id: 'ecommerce', name: 'E-commerce', count: 6 },
  { id: 'agency', name: 'Agency', count: 5 },
  { id: 'saas', name: 'SaaS', count: 4 }
];

const SORT_OPTIONS = [
  { id: 'recommended', name: 'Recommended' },
  { id: 'newest', name: 'Newest' },
  { id: 'popular', name: 'Most Popular' },
  { id: 'rating', name: 'Highest Rated' }
];

export default function WixStyleTemplateLibrary({ templates, onSelectTemplate, onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Filter and sort templates
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category.toLowerCase() === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-gray-600"
              >
                <FiArrowLeft className="w-5 h-5" />
                Back
              </button>
              
              <h1 className="text-2xl font-bold text-gray-900 font-['Plus_Jakarta_Sans']">
                Pick the Website Template You Love
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters and Sort */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-semibold text-gray-900 font-['Plus_Jakarta_Sans']">
              All Website Templates
            </h2>
            
            {/* Category Filters */}
            <div className="flex items-center gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Templates Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="group">
                {/* Template Preview */}
                <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onSelectTemplate(template)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                      >
                        <FiEdit3 className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                        <FiEye className="w-4 h-4" />
                        View
                      </button>
                      <button className="px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center gap-2">
                        <FiInfo className="w-4 h-4" />
                        Info
                      </button>
                    </div>
                  </div>

                  {/* Premium Badge */}
                  {template.isPremium && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                        PREMIUM
                      </span>
                    </div>
                  )}

                  {/* Popular Badge */}
                  {template.isPopular && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                        POPULAR
                      </span>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="pt-4">
                  <h3 className="font-semibold text-gray-900 mb-1 font-['Plus_Jakarta_Sans']">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {template.category}
                  </p>
                  <div className="flex items-center gap-2">
                    {template.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="flex items-center gap-6 p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 font-['Plus_Jakarta_Sans']">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {template.category}
                        </span>
                        {template.isPremium && (
                          <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                            PREMIUM
                          </span>
                        )}
                        {template.isPopular && (
                          <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                            POPULAR
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectTemplate(template)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                      >
                        <FiEdit3 className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <FiEye className="w-4 h-4" />
                        View
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                        <FiInfo className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FiSearch className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-['Plus_Jakarta_Sans']">
              No templates found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse different categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Previous
          </button>
          
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg transition-colors ${
                page === 1
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <span className="px-4 py-2 text-gray-500">...</span>
          
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            222
          </button>
          
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
