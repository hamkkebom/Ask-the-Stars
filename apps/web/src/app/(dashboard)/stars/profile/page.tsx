'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Globe, Github, Camera, Briefcase, GraduationCap, PenTool } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { mockUserProfile } from '@/data/mocks/profile';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const [profile, setProfile] = useState(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        {/* Banner/Cover Image (Optional placeholder) */}
        <div className="h-48 w-full bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-2xl border border-white/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        </div>

        {/* Profile Card Overlay */}
        <div className="relative -mt-20 px-6">
          <div className="flex flex-col md:flex-row gap-6 items-end md:items-center">
             {/* Avatar */}
             <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-[#0F1115] overflow-hidden bg-gray-800">
                  <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-1 right-1 p-2 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
             </div>

             {/* Info */}
             <div className="flex-1 pb-2">
                <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
                  {profile.name}
                  <button className="px-3 py-1 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-colors">
                    프로필 수정
                  </button>
                </h1>
                <p className="text-gray-400 font-medium mb-3">{profile.title}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {profile.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4" /> {profile.email}
                  </span>
                  {profile.website && (
                    <a href={profile.website} target="_blank" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <Globe className="w-4 h-4" /> 웹사이트
                    </a>
                  )}
                  {profile.github && (
                     <a href={profile.github} target="_blank" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                       <Github className="w-4 h-4" /> GitHub
                     </a>
                  )}
                </div>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Bio & Skills */}
        <div className="space-y-8">
          {/* Bio */}
          <GlassCard className="p-6 space-y-4">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
               소개
             </h3>
             <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
               {profile.bio}
             </p>
          </GlassCard>

          {/* Skills */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <PenTool className="w-5 h-5 text-primary" />
              보유 기술
            </h3>
            <div className="flex flex-wrap gap-2">
               {profile.skills.map((skill, i) => (
                 <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300">
                   {skill}
                 </span>
               ))}
               <button className="px-3 py-1.5 rounded-lg border border-dashed border-white/20 text-sm text-gray-500 hover:text-white hover:border-white/40 transition-colors">
                 + 추가
               </button>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Experience & Education */}
        <div className="lg:col-span-2 space-y-8">
           {/* Experience */}
           <GlassCard className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  경력 사항
                </h3>
                <button className="text-sm text-gray-400 hover:text-white">+ 추가</button>
              </div>

              <div className="space-y-6">
                {profile.experience.map((exp, i) => (
                   <div key={exp.id} className="relative pl-6 border-l border-white/10 last:border-0">
                      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                      <div className="mb-1">
                        <h4 className="text-white font-semibold">{exp.role}</h4>
                        <span className="text-sm text-primary">{exp.company}</span>
                        <span className="text-sm text-gray-500 mx-2">•</span>
                        <span className="text-sm text-gray-500">{exp.period}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">{exp.description}</p>
                   </div>
                ))}
              </div>
           </GlassCard>

           {/* Education */}
           <GlassCard className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-green-400" />
                  학력
                </h3>
                <button className="text-sm text-gray-400 hover:text-white">+ 추가</button>
              </div>

              <div className="space-y-4">
                {profile.education.map((edu, i) => (
                  <div key={edu.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                     <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
                        <GraduationCap className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="text-white font-semibold">{edu.school}</h4>
                       <p className="text-gray-400">{edu.degree}</p>
                       <p className="text-xs text-gray-500 mt-1">{edu.period}</p>
                     </div>
                  </div>
                ))}
              </div>
           </GlassCard>
        </div>

      </div>
    </div>
  );
}
