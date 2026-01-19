'use client';

import { useState, useMemo } from 'react';
import { PortfolioItem, mockPortfolioItems, portfolioCategories } from '@/data/mocks/portfolio';
import { PortfolioCard } from './PortfolioCard';
import { PortfolioEditorModal } from './PortfolioEditorModal';
import { PortfolioDetailModal } from './PortfolioDetailModal';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

export function PortfolioGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<PortfolioItem[]>(mockPortfolioItems);

  // Modal States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleAddNew = () => {
    setSelectedItem(null); // Reset selection for new item
    setIsEditorOpen(true);
  };

  const handleSaveItem = (newItemData: Omit<PortfolioItem, 'id' | 'createdAt' | 'stats'>) => {
    const newItem: PortfolioItem = {
      ...newItemData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0],
      stats: { views: 0, likes: 0 }
    };
    setItems([newItem, ...items]);
  };

  return (
    <div className="space-y-6">
      {/* Controls: Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Categories */}
        <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-x-auto max-w-full no-scrollbar">
          {portfolioCategories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                selectedCategory === cat.value
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Add */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="프로젝트 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">새 작품</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map(item => (
              <PortfolioCard
                key={item.id}
                item={item}
                onClick={handleItemClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-gray-400">
          <p>검색 결과가 없습니다.</p>
        </div>
      )}

      {/* Modals */}
      <PortfolioEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveItem}
        initialData={null}
      />

      <PortfolioDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}
