'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, FileText, FileCode, Link as LinkIcon, File } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { mockResourceCategories, mockResources, ResourceItem } from '@/data/mocks/resources';
import { cn } from '@/lib/utils';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = mockResources.filter(item => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const getFileIcon = (type: ResourceItem['fileType']) => {
    switch (type) {
      case 'PDF': return <FileText className="w-6 h-6 text-red-500" />;
      case 'ZIP': return <FileCode className="w-6 h-6 text-yellow-500" />;
      case 'LINK': return <LinkIcon className="w-6 h-6 text-blue-500" />;
      case 'DOCX': return <FileText className="w-6 h-6 text-blue-400" />;
      default: return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">자료실</h1>
          <p className="text-gray-400">작업에 필요한 가이드, 에셋, 서식 등을 다운로드하세요.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="자료 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-primary/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {mockResourceCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border",
              selectedCategory === cat.id
                ? "bg-primary/20 text-primary border-primary/30"
                : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10"
            )}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* List */}
      <div className="grid gap-4">
        {filteredResources.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="p-5 flex items-start gap-4 hover:bg-white/5 transition-colors group cursor-pointer">
               {/* Icon */}
               <div className="p-3 rounded-xl bg-white/5 border border-white/5 shrink-0">
                 {getFileIcon(item.fileType)}
               </div>

               {/* Content */}
               <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    {item.isNew && (
                      <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/20">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{item.author}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>다운로드 {item.downloads.toLocaleString()}회</span>
                    {item.fileSize && (
                      <>
                        <span>•</span>
                        <span className="text-gray-400">{item.fileSize}</span>
                      </>
                    )}
                  </div>
               </div>

               {/* Download Button */}
               <div className="self-center">
                 <button className="p-3 rounded-xl bg-white/5 hover:bg-primary hover:text-white text-gray-400 transition-all shadow-lg border border-white/5">
                   <Download className="w-5 h-5" />
                 </button>
               </div>
            </GlassCard>
          </motion.div>
        ))}

        {filteredResources.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
