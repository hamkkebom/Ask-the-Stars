'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp, Clock, MessageSquare, Wallet, Bell,
  CheckCircle2, AlertTriangle, Calendar, ArrowRight,
  Play, FileVideo, DollarSign
} from 'lucide-react';

// Mock data for notifications
const mockNotifications = [
  {
    id: 'n1',
    type: 'feedback',
    title: '긴급 피드백 도착',
    desc: '신년운세 영상 #1024에 수정 요청',
    time: '5분 전',
    urgent: true
  },
  {
    id: 'n2',
    type: 'payment',
    title: '정산 완료',
    desc: '타로 리딩 영상 #1021 - ₩120,000',
    time: '1시간 전',
    urgent: false
  },
  {
    id: 'n3',
    type: 'project',
    title: '새 프로젝트 매칭',
    desc: '재물운 상승 비법 영상 제작',
    time: '3시간 전',
    urgent: false
  },
];

// Mock data for today's tasks
const mockTodayTasks = [
  {
    id: 't1',
    title: '운세 영상 제작 #1024',
    type: 'deadline',
    desc: '오늘 마감',
    status: 'urgent',
    link: '/stars/my-projects'
  },
  {
    id: 't2',
    title: '신년운세 영상 #1023',
    type: 'feedback',
    desc: '피드백 3건 대기',
    status: 'pending',
    link: '/stars/feedback'
  },
  {
    id: 't3',
    title: '포트폴리오 업데이트',
    type: 'task',
    desc: '새 작업물 추가 권장',
    status: 'optional',
    link: '/stars/portfolio'
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'feedback': return <MessageSquare className="w-4 h-4" />;
    case 'payment': return <DollarSign className="w-4 h-4" />;
    case 'project': return <FileVideo className="w-4 h-4" />;
    default: return <Bell className="w-4 h-4" />;
  }
};

const getTaskStatusStyle = (status: string) => {
  switch (status) {
    case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'pending': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'optional': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

export default function StarsDashboardPage() {
  const [notifications] = useState(mockNotifications);
  const [todayTasks] = useState(mockTodayTasks);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">별님 대시보드</h1>
        <p className="text-gray-400 mt-1">
          내 프로젝트 현황과 수입을 확인하세요.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm font-medium text-gray-400">진행 중 프로젝트</span>
          </div>
          <div className="mt-4 text-4xl font-bold text-white">3</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm font-medium text-gray-400">새 제작요청</span>
          </div>
          <div className="mt-4 text-4xl font-bold text-white">7</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <MessageSquare className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-sm font-medium text-gray-400">대기 중 피드백</span>
          </div>
          <div className="mt-4 text-4xl font-bold text-white">5</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Wallet className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-sm font-medium text-gray-400">이번 달 예상 수입</span>
          </div>
          <div className="mt-4 text-4xl font-bold text-white">₩850K</div>
        </motion.div>
      </div>

      {/* Two Column Layout: Notifications + Today's Tasks */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 🔔 Notifications Widget */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-semibold text-white">알림</h2>
              <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                {notifications.filter(n => n.urgent).length}
              </span>
            </div>
            <Link href="/stars/notifications" className="text-sm text-gray-400 hover:text-white transition-colors">
              전체 보기 →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {notifications.map((notification, i) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${
                  notification.urgent ? 'bg-red-500/5' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    notification.urgent
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-white/10 text-gray-400'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white truncate">{notification.title}</p>
                      {notification.urgent && (
                        <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold">
                          긴급
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{notification.desc}</p>
                  </div>
                  <span className="text-xs text-gray-600 whitespace-nowrap">{notification.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 📋 Today's Tasks Widget */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">오늘의 할 일</h2>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                {todayTasks.length}
              </span>
            </div>
            <Link href="/stars/my-projects/calendar" className="text-sm text-gray-400 hover:text-white transition-colors">
              캘린더 보기 →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {todayTasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Link
                  href={task.link}
                  className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      task.status === 'urgent' ? 'bg-red-500 animate-pulse' :
                      task.status === 'pending' ? 'bg-orange-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <p className="font-medium text-white group-hover:text-yellow-400 transition-colors">
                        {task.title}
                      </p>
                      <p className="text-sm text-gray-500">{task.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getTaskStatusStyle(task.status)}`}>
                      {task.status === 'urgent' ? '마감 임박' :
                       task.status === 'pending' ? '대기 중' : '선택'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* My Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-lg font-semibold text-white">내 프로젝트</h2>
          <Link href="/stars/my-projects" className="text-sm text-gray-400 hover:text-white transition-colors">
            전체 보기 →
          </Link>
        </div>
        <div className="divide-y divide-white/5">
          {[
            { title: '운세 영상 제작 #1024', status: '작업 중', statusColor: 'bg-blue-500/20 text-blue-400', deadline: '1월 20일' },
            { title: '신년 운세 영상 #1023', status: '피드백 대기', statusColor: 'bg-orange-500/20 text-orange-400', deadline: '1월 18일' },
            { title: '타로 리딩 영상 #1021', status: '수정 요청', statusColor: 'bg-red-500/20 text-red-400', deadline: '1월 17일' },
          ].map((project, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <Play className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{project.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    마감: {project.deadline}
                  </p>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${project.statusColor}`}>
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
