'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function EarningsLoading() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Skeleton className="h-9 w-36 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          'border-blue-500/30',
          'border-green-500/30',
          'border-purple-500/30'
        ].map((border, i) => (
          <div
            key={i}
            className={`rounded-xl border ${border} bg-white/5 p-6`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="w-9 h-9 rounded-lg" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-9 w-28 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded" />
            <Skeleton className="h-8 w-16 rounded" />
          </div>
        </div>
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>

      {/* Tabs & Earnings List */}
      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="flex border-b border-white/10 p-1">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-32 mx-2" />
          ))}
        </div>
        <div className="divide-y divide-white/5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Skeleton className="h-5 w-10 rounded" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-3 w-32" />
              </div>
              <div className="text-right">
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-5 w-32 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
