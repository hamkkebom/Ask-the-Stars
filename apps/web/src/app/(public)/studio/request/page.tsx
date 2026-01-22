'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { FileDropzone } from '@/components/ui/file-dropzone';
import {
  Send, Upload, FileText, CheckCircle,
  ArrowLeft, Info, X
} from 'lucide-react';

const videoTypes = [
  { id: 'short', name: '숏폼 (15-60초)', price: '8만원~' },
  { id: 'promo', name: '홍보 영상 (1-3분)', price: '15만원~' },
  { id: 'edu', name: '교육 콘텐츠 (3-10분)', price: '20만원~' },
  { id: 'youtube', name: '유튜브 (5-15분)', price: '25만원~' },
  { id: 'custom', name: '맞춤 제작', price: '상담 후 결정' },
];

export default function RequestPage() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    videoType: '',
    title: '',
    description: '',
    deadline: '',
    budget: '',
    reference: '',
    contact: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/studio"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          스튜디오로 돌아가기
        </Link>

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-white mb-4">제작 의뢰</h1>
          <p className="text-gray-400">프로젝트 정보를 입력해주세요</p>
        </m.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                step >= s ? 'bg-primary text-white' : 'bg-white/10 text-gray-500'
              }`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-primary' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Video Type */}
        {step === 1 && (
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">영상 유형 선택</h2>
              <div className="space-y-3">
                {videoTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setFormData({ ...formData, videoType: type.id });
                      setStep(2);
                    }}
                    className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left flex items-center justify-between group"
                  >
                    <span className="text-white group-hover:text-purple-400 transition-colors">
                      {type.name}
                    </span>
                    <span className="text-purple-400 font-medium">{type.price}</span>
                  </button>
                ))}
              </div>
            </GlassCard>
          </m.div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit}>
              <GlassCard className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-white mb-4">프로젝트 정보</h2>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">프로젝트 제목 *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                    placeholder="예: 신년 운세 타로 영상"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">상세 설명 *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 min-h-[120px]"
                    placeholder="영상의 목적, 내용, 스타일 등을 설명해주세요"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">희망 마감일</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">예산</label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                    placeholder="예: 20만원"
                  />
                </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">참고 자료</label>
                <FileDropzone
                  onFilesSelected={(newFiles) => setFiles(prev => [...prev, ...newFiles])}
                  accept={['image/*', 'application/pdf', 'video/*']}
                  maxSize={50 * 1024 * 1024} // 50MB
                />
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300 truncate">{file.name}</span>
                          <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)}MB</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
                          className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-500 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">연락처 *</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="010-0000-0000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">이메일 *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                >
                  이전
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  의뢰 제출
                </button>
              </div>
            </GlassCard>
          </form>
        </m.div>
        )}

        {/* Step 3: Complete */}
        {step === 3 && (
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <GlassCard className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">의뢰가 접수되었습니다!</h2>
              <p className="text-gray-400 mb-6">
                영업일 기준 1-2일 내에<br />
                담당자가 연락드리겠습니다.
              </p>
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                스튜디오로 돌아가기
              </Link>
            </GlassCard>
          </m.div>
        )}
      </div>
    </div>
  );
}
