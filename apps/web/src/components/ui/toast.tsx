'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { GlassCard } from './glass-card';

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: 'text-green-400',
  error: 'text-red-400',
  info: 'text-blue-400',
  warning: 'text-yellow-400',
};

const bgColors = {
  success: 'bg-green-500/10 border-green-500/20',
  error: 'bg-red-500/10 border-red-500/20',
  info: 'bg-blue-500/10 border-blue-500/20',
  warning: 'bg-yellow-500/10 border-yellow-500/20',
};

export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 p-4 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon = icons[toast.type];

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
              className="pointer-events-auto"
            >
              <GlassCard
                className={cn(
                  "flex items-center gap-3 p-4 min-w-[300px] backdrop-blur-xl border shadow-lg",
                  bgColors[toast.type]
                )}
                hoverEffect={false}
              >
                <Icon className={cn("w-5 h-5", colors[toast.type])} />
                <p className="text-sm font-medium text-white flex-1">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </GlassCard>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
