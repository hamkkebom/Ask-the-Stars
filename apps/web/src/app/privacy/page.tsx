'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Trash2, Clock, Mail } from 'lucide-react';

export default function PrivacyPage() {
  const effectiveDate = '2026년 1월 20일';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">홈으로</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-white/20 rounded-2xl">
              <Shield className="w-12 h-12" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            개인정보처리방침
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80"
          >
            회원님의 소중한 개인정보를 안전하게 보호합니다
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 inline-flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-full"
          >
            <Clock className="w-4 h-4" />
            시행일: {effectiveDate}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <main className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg max-w-none"
          >
            {/* 제1조 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Database className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">제1조 (개인정보의 수집 및 이용 목적)</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-gray-700">
                <p className="m-0 mb-4">한깨봄(이하 &quot;회사&quot;)은 다음의 목적을 위하여 개인정보를 수집 및 이용합니다:</p>
                <ul className="list-disc pl-5 space-y-2 m-0">
                  <li><strong>회원 관리</strong>: 회원제 서비스 이용, 개인 식별, 가입 의사 확인, 본인 확인</li>
                  <li><strong>서비스 제공</strong>: 영상 제작 협업 서비스, 프리랜서-클라이언트 매칭, 정산 서비스</li>
                  <li><strong>마케팅 및 광고</strong>: 신규 서비스 안내, 이벤트 정보 제공 (선택 동의 시)</li>
                  <li><strong>서비스 개선</strong>: 접속 빈도 파악, 서비스 이용 통계</li>
                </ul>
              </div>
            </section>

            {/* 제2조 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Eye className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">제2조 (수집하는 개인정보 항목)</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-gray-700 space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">필수 항목</h3>
                  <ul className="list-disc pl-5 space-y-1 m-0">
                    <li>이메일 주소, 비밀번호, 이름</li>
                    <li>휴대전화번호 (본인 확인 시)</li>
                    <li>정산 계좌 정보 (프리랜서의 경우)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">선택 항목</h3>
                  <ul className="list-disc pl-5 space-y-1 m-0">
                    <li>프로필 사진, 자기소개</li>
                    <li>포트폴리오 정보</li>
                    <li>마케팅 수신 동의 여부</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">자동 수집 항목</h3>
                  <ul className="list-disc pl-5 space-y-1 m-0">
                    <li>IP 주소, 쿠키, 서비스 이용 기록</li>
                    <li>접속 로그, 방문 일시, 기기 정보</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 제3조 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">제3조 (개인정보의 보유 및 이용 기간)</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-gray-700 space-y-4">
                <p className="m-0 mb-4">
                  회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                  단, 관련 법령에 의해 보존할 필요가 있는 경우 아래와 같이 보관합니다:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-emerald-50">
                        <th className="border border-gray-200 px-4 py-2 text-left">보존 항목</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">보존 기간</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">근거 법령</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2">계약 또는 청약철회 등에 관한 기록</td>
                        <td className="border border-gray-200 px-4 py-2">5년</td>
                        <td className="border border-gray-200 px-4 py-2">전자상거래법</td>
                      </tr>
                      <tr className="bg-gray-25">
                        <td className="border border-gray-200 px-4 py-2">대금결제 및 재화 등의 공급에 관한 기록</td>
                        <td className="border border-gray-200 px-4 py-2">5년</td>
                        <td className="border border-gray-200 px-4 py-2">전자상거래법</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2">소비자 불만 또는 분쟁처리에 관한 기록</td>
                        <td className="border border-gray-200 px-4 py-2">3년</td>
                        <td className="border border-gray-200 px-4 py-2">전자상거래법</td>
                      </tr>
                      <tr className="bg-gray-25">
                        <td className="border border-gray-200 px-4 py-2">웹사이트 방문 기록</td>
                        <td className="border border-gray-200 px-4 py-2">3개월</td>
                        <td className="border border-gray-200 px-4 py-2">통신비밀보호법</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 제4조 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">제4조 (개인정보의 제3자 제공)</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-gray-700 space-y-4">
                <p className="m-0 mb-4">
                  회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
                  다만, 아래의 경우에는 예외로 합니다:
                </p>
                <ul className="list-disc pl-5 space-y-2 m-0">
                  <li>이용자가 사전에 동의한 경우</li>
                  <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                  <li>서비스 제공에 따른 요금 정산을 위하여 필요한 경우</li>
                </ul>
              </div>
            </section>

            {/* 제5조 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Lock className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">제5조 (개인정보의 안전성 확보 조치)</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-gray-700 space-y-4">
                <p className="m-0 mb-4">회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
                <ul className="list-disc pl-5 space-y-2 m-0">
                  <li><strong>관리적 조치</strong>: 개인정보 보호 담당자 지정, 취급 직원의 교육</li>
                  <li><strong>기술적 조치</strong>: 개인정보 암호화, 접근 제어 시스템 운영, 보안 프로그램 설치</li>
                  <li><strong>물리적 조치</strong>: 전산실 및 자료 보관실 접근 통제</li>
                </ul>
              </div>
            </section>

            {/* 제6조 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">제6조 (이용자의 권리와 그 행사 방법)</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-gray-700 space-y-4">
                <p className="m-0 mb-4">이용자는 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
                <ul className="list-disc pl-5 space-y-2 m-0">
                  <li>개인정보 열람 요구</li>
                  <li>오류 등이 있을 경우 정정 요구</li>
                  <li>삭제 요구</li>
                  <li>처리 정지 요구</li>
                </ul>
                <p className="mt-4 m-0">
                  권리 행사는 서면, 전자우편 등을 통해 하실 수 있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.
                </p>
              </div>
            </section>

            {/* 제7조 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Trash2 className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">제7조 (개인정보의 파기)</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-gray-700 space-y-4">
                <p className="m-0 mb-4">
                  회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 된 때에는
                  지체 없이 해당 개인정보를 파기합니다.
                </p>
                <ul className="list-disc pl-5 space-y-2 m-0">
                  <li><strong>전자적 파일 형태</strong>: 복구 및 재생이 불가능한 방법으로 영구 삭제</li>
                  <li><strong>종이 문서 형태</strong>: 분쇄 또는 소각</li>
                </ul>
              </div>
            </section>

            {/* 제8조 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">제8조 (개인정보 보호 책임자)</h2>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <p className="text-emerald-900 m-0 mb-4">
                  회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 이용자의 불만 처리 및 피해 구제 등을 위하여
                  아래와 같이 개인정보 보호 책임자를 지정하고 있습니다.
                </p>
                <div className="bg-white rounded-xl p-4 space-y-2">
                  <p className="m-0"><strong>개인정보 보호 책임자</strong></p>
                  <ul className="list-none pl-0 space-y-1 m-0 text-emerald-800">
                    <li>• 성명: 개인정보 보호팀</li>
                    <li>• 이메일: privacy@hamkkebom.com</li>
                    <li>• 전화: 02-1234-5678</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 부칙 */}
            <section className="mb-12">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-emerald-900 mb-4">부칙</h2>
                <p className="text-emerald-800 m-0">
                  이 개인정보처리방침은 {effectiveDate}부터 적용됩니다.
                </p>
              </div>
            </section>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/terms"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              <Shield className="w-5 h-5" />
              이용약관 보기
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              홈으로 돌아가기
            </Link>
          </motion.div>
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
