'use client';

import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText, Shield, AlertCircle, Scale, Clock, List } from 'lucide-react';

export default function TermsPage() {
  const effectiveDate = '2026년 1월 20일';
  const [activeSection, setActiveSection] = useState('article-1');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section[id^="article-"]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const termsSections = [
    {
      id: 'article-1',
      title: '제1조 (목적)',
      icon: <Scale className="w-5 h-5 text-blue-600" />,
      content: (
        <p className="m-0">
          이 약관은 한깨봄(이하 &quot;회사&quot;)이 운영하는 &quot;별들에게 물어봐&quot; 플랫폼(이하 &quot;서비스&quot;)의 이용과 관련하여
          회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>
      )
    },
    {
      id: 'article-2',
      title: '제2조 (용어의 정의)',
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      content: (
        <ol className="list-decimal pl-5 space-y-3 m-0">
          <li><strong>&quot;서비스&quot;</strong>란 회사가 제공하는 AI 영상 제작 협업 플랫폼을 의미합니다.</li>
          <li><strong>&quot;이용자&quot;</strong>란 서비스에 접속하여 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
          <li><strong>&quot;회원&quot;</strong>이란 서비스에 가입하여 아이디(ID)를 부여받은 자를 말합니다.</li>
          <li><strong>&quot;프리랜서&quot;</strong>란 서비스를 통해 영상 제작 서비스를 제공하는 회원을 말합니다.</li>
          <li><strong>&quot;클라이언트&quot;</strong>란 서비스를 통해 영상 제작을 의뢰하는 회원을 말합니다.</li>
        </ol>
      )
    },
    {
      id: 'article-3',
      title: '제3조 (약관의 효력 및 변경)',
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      content: (
        <ol className="list-decimal pl-5 space-y-3 m-0">
          <li>이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
          <li>회사는 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.</li>
          <li>변경된 약관은 적용일자 및 변경 사유를 명시하여 최소 7일 전에 공지합니다.</li>
        </ol>
      )
    },
    {
      id: 'article-4',
      title: '제4조 (서비스의 제공)',
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      content: (
        <>
          <p className="m-0 mb-4">회사는 다음의 서비스를 제공합니다:</p>
          <ul className="list-disc pl-5 space-y-2 m-0">
            <li>AI 영상 제작 협업 플랫폼 서비스</li>
            <li>프리랜서-클라이언트 매칭 서비스</li>
            <li>영상 피드백 및 검수 서비스</li>
            <li>정산 및 결제 대행 서비스</li>
            <li>AI 영상 제작 교육 서비스</li>
            <li>공모전 개최 및 관리 서비스</li>
            <li>기타 회사가 정하는 서비스</li>
          </ul>
        </>
      )
    },
    {
      id: 'article-5',
      title: '제5조 (회원 가입)',
      icon: <AlertCircle className="w-5 h-5 text-blue-600" />,
      content: (
        <ol className="list-decimal pl-5 space-y-3 m-0">
          <li>회원 가입은 이 약관에 동의한 후 회원 가입 신청을 하고, 회사가 이를 승낙함으로써 성립됩니다.</li>
          <li>회사는 다음 각 호에 해당하는 경우 회원 가입을 거절할 수 있습니다:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>실명이 아닌 경우</li>
              <li>다른 사람의 명의를 사용한 경우</li>
              <li>가입 신청 시 허위 정보를 기재한 경우</li>
              <li>기타 회원으로 등록하는 것이 서비스 운영에 지장이 있는 경우</li>
            </ul>
          </li>
        </ol>
      )
    },
    {
      id: 'article-6',
      title: '제6조 (회원의 의무)',
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      content: (
        <ol className="list-decimal pl-5 space-y-3 m-0">
          <li>회원은 관계 법령, 이 약관, 서비스 이용 안내 등을 준수해야 합니다.</li>
          <li>회원은 다음 행위를 해서는 안 됩니다:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>타인의 정보 도용</li>
              <li>회사가 게시한 정보의 무단 변경</li>
              <li>회사가 허용하지 않은 정보의 게시 또는 전송</li>
              <li>회사 및 제3자의 저작권 등 지적재산권 침해</li>
              <li>회사 및 제3자의 명예 훼손 또는 업무 방해</li>
              <li>외설적인 정보의 게시</li>
              <li>기타 불법적이거나 부당한 행위</li>
            </ul>
          </li>
        </ol>
      )
    },
    {
      id: 'article-7',
      title: '제7조 (정산 및 결제)',
      icon: <Scale className="w-5 h-5 text-blue-600" />,
      content: (
        <ol className="list-decimal pl-5 space-y-3 m-0">
          <li>프리랜서의 정산은 1차 정산(제작비)과 2차 정산(인센티브)으로 구분됩니다.</li>
          <li>1차 정산은 매월 1일, 2차 정산은 분기별(3/31, 6/30, 9/30, 12/31)로 진행됩니다.</li>
          <li>회사는 정산금에서 플랫폼 이용 수수료를 공제할 수 있습니다.</li>
          <li>세금 관련 사항은 관련 법령에 따릅니다.</li>
        </ol>
      )
    },
    {
      id: 'article-8',
      title: '제8조 (면책조항)',
      icon: <AlertCircle className="w-5 h-5 text-blue-600" />,
      content: (
        <ol className="list-decimal pl-5 space-y-3 m-0">
          <li>회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력으로 인해 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
          <li>회사는 회원의 귀책 사유로 인한 서비스 이용 장애에 대해 책임지지 않습니다.</li>
          <li>회사는 회원이 게시한 정보, 자료의 신뢰성, 정확성 등에 대해 책임지지 않습니다.</li>
        </ol>
      )
    },
    {
      id: 'article-9',
      title: '제9조 (분쟁 해결)',
      icon: <Scale className="w-5 h-5 text-blue-600" />,
      content: (
        <ol className="list-decimal pl-5 space-y-3 m-0">
          <li>이 약관에 명시되지 않은 사항은 관계 법령 및 상관례에 따릅니다.</li>
          <li>서비스 이용과 관련하여 분쟁이 발생한 경우, 회사와 회원은 원만한 해결을 위해 성실히 협의합니다.</li>
          <li>협의가 이루어지지 않을 경우 관할 법원은 회사 소재지 관할 법원으로 합니다.</li>
        </ol>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="fixed inset-0 bg-linear-to-b from-slate-50 to-white -z-10" />

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-md supports-backdrop-filter:bg-white/60">
        <div className="container flex h-16 items-center px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">홈으로</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-6 bg-linear-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-white/20 rounded-2xl">
              <FileText className="w-12 h-12" />
            </div>
          </m.div>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            이용약관
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80"
          >
            서비스 이용에 관한 기본적인 사항을 규정합니다
          </m.p>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 inline-flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-full"
          >
            <Clock className="w-4 h-4" />
            시행일: {effectiveDate}
          </m.div>
        </div>
      </section>

      {/* Content */}
      <main className="py-16 px-6 max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block relative">
            <div className="sticky top-24 space-y-4">
               <h3 className="font-bold text-gray-900 mb-4 px-4 flex items-center gap-2">
                 <List className="w-4 h-4" /> 목차
               </h3>
               <nav className="space-y-1">
                 {termsSections.map((section) => (
                   <a
                     key={section.id}
                     href={`#${section.id}`}
                     className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                       activeSection === section.id
                         ? 'bg-blue-50 text-blue-700 font-medium'
                         : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                     }`}
                     onClick={(e) => {
                       e.preventDefault();
                       document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                       setActiveSection(section.id);
                     }}
                   >
                     {section.title}
                   </a>
                 ))}
               </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto lg:mx-0">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose prose-lg max-w-none"
            >
              {termsSections.map((section) => (
                <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 m-0">{section.title}</h2>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 text-gray-700 space-y-4">
                     {section.content}
                  </div>
                </section>
              ))}

              {/* 부칙 */}
              <section className="mb-12">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-blue-900 mb-4">부칙</h2>
                  <p className="text-blue-800 m-0">
                    이 약관은 {effectiveDate}부터 시행됩니다.
                  </p>
                </div>
              </section>
            </m.div>

            {/* Navigation */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                <Shield className="w-5 h-5" />
                개인정보처리방침 보기
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                홈으로 돌아가기
              </Link>
            </m.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t bg-gray-50">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          <p>© 2026 한깨봄 (별들에게 물어봐). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
