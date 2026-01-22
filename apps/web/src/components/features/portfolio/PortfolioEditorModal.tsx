'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus, X as RemoveIcon } from 'lucide-react';
import { PortfolioItem, PortfolioCategory, portfolioCategories } from '@/data/mocks/portfolio';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';

interface PortfolioEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<PortfolioItem, 'id' | 'createdAt' | 'stats'>) => void;
  initialData?: PortfolioItem | null;
}

export function PortfolioEditorModal({ isOpen, onClose, onSave, initialData }: PortfolioEditorModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'VIDEO' as PortfolioCategory,
    tags: [] as string[],
    thumbnailUrl: '',
    videoUrl: '',
    role: '',
    tagInput: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category,
        tags: initialData.tags,
        thumbnailUrl: initialData.thumbnailUrl,
        videoUrl: initialData.videoUrl || '',
        role: initialData.role,
        tagInput: ''
      });
    } else {
      // Reset form for new item
      setFormData({
        title: '',
        description: '',
        category: 'VIDEO',
        tags: [],
        thumbnailUrl: '',
        videoUrl: '',
        role: '',
        tagInput: ''
      });
    }
  }, [initialData?.id, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags,
      thumbnailUrl: formData.thumbnailUrl || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop', // Default placeholder
      videoUrl: formData.videoUrl,
      role: formData.role
    });
    onClose();
  };

  const addTag = () => {
    if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ''
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0F1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">
              {initialData ? '포트폴리오 수정' : '새 작품 등록'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

            {/* Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-400">제목</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="작품 제목을 입력하세요"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">카테고리</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as PortfolioCategory })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary/50 focus:outline-none [&>option]:bg-gray-900"
                >
                  {portfolioCategories.filter(c => c.value !== 'ALL').map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* URL Inputs */}
            <div className="space-y-4">
               {/* Thumbnail URL (Simple text input for MVP) */}
               <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">썸네일 이미지 URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={e => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary/50 focus:outline-none"
                  />
                  {formData.thumbnailUrl && (
                    <div className="w-10 h-10 rounded overflow-hidden border border-white/10 shrink-0">
                      <img src={formData.thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">* 실제 구현 시 파일 업로더로 교체됩니다.</p>
              </div>

              {/* Video URL */}
              {(formData.category === 'VIDEO' || formData.category === 'SHORTS') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">영상 링크 (유튜브 등)</label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary/50 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Role & Description */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">나의 역할 / 기여도</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  placeholder="예: 기획, 촬영, 컷편집, 자막 (100%)"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary/50 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">작품 설명</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="작품에 대한 간단한 설명을 입력하세요..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary/50 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">태그</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-1 border border-primary/20">
                    #{tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-white">
                      <RemoveIcon className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.tagInput}
                  onChange={e => setFormData({ ...formData, tagInput: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="태그 입력 후 Enter"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
              >
                {initialData ? '수정 완료' : '등록하기'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
