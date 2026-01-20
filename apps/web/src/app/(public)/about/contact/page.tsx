'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Building2, MessageCircle, CheckCircle, Video, BarChart3, GraduationCap, HelpCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: "주소",
    content: "서울특별시 강남구 테헤란로 123\n한깨봄 빌딩 5층",
    action: null
  },
  {
    icon: Phone,
    title: "전화",
    content: "02-1234-5678",
    action: "tel:02-1234-5678"
  },
  {
    icon: Mail,
    title: "이메일",
    content: "hello@hamkkebom.com",
    action: "mailto:hello@hamkkebom.com"
  },
  {
    icon: Clock,
    title: "운영시간",
    content: "평일 09:00 - 18:00\n(주말 및 공휴일 휴무)",
    action: null
  }
];

const services = [
  { value: "video", label: "AI 영상 제작 대행", icon: Video },
  { value: "marketing", label: "AI 마케팅 대행", icon: BarChart3 },
  { value: "education", label: "AI 교육", icon: GraduationCap },
  { value: "other", label: "기타 문의", icon: HelpCircle },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">문의가 접수되었습니다</h2>
          <p className="text-gray-600 mb-8">
            빠른 시일 내에 담당자가 연락드리겠습니다.<br />
            보통 영업일 기준 24시간 내에 회신드립니다.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-3 bg-[#FF3366] text-white font-bold rounded-full hover:bg-[#FF1A4D] transition-colors"
          >
            추가 문의하기
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-[1000px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-bold tracking-widest text-[#FF3366] uppercase">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              문의하기
            </h1>
            <p className="text-lg text-white/70">
              AI 영상제작, 마케팅, 교육에 관한 문의를 남겨주세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form - 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-2">프로젝트 문의</h2>
              <p className="text-gray-500 mb-8">필수 항목(*)을 채워주세요</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focusedField === 'name' || formData.name
                          ? '-top-2 text-xs bg-white px-1 text-[#FF3366]'
                          : 'top-4 text-gray-400'
                      }`}
                    >
                      이름 *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#FF3366] outline-none transition-all"
                      value={formData.name}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        focusedField === 'email' || formData.email
                          ? '-top-2 text-xs bg-white px-1 text-[#FF3366]'
                          : 'top-4 text-gray-400'
                      }`}
                    >
                      이메일 *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#FF3366] outline-none transition-all"
                      value={formData.email}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'company' || formData.company
                        ? '-top-2 text-xs bg-white px-1 text-[#FF3366]'
                        : 'top-4 text-gray-400'
                    }`}
                  >
                    회사명/기관명
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#FF3366] outline-none transition-all"
                    value={formData.company}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                {/* Service Selection - Icon Cards */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    관심 서비스 *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {services.map((service) => (
                      <motion.button
                        key={service.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, service: service.value })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.service === service.value
                            ? 'border-[#FF3366] bg-[#FF3366]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <service.icon className={`w-6 h-6 mx-auto mb-2 ${
                          formData.service === service.value ? 'text-[#FF3366]' : 'text-gray-400'
                        }`} />
                        <p className={`text-sm font-medium ${
                          formData.service === service.value ? 'text-[#FF3366]' : 'text-gray-600'
                        }`}>
                          {service.label}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'message' || formData.message
                        ? '-top-2 text-xs bg-white px-1 text-[#FF3366] z-10'
                        : 'top-4 text-gray-400'
                    }`}
                  >
                    문의 내용 *
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#FF3366] outline-none transition-all resize-none"
                    value={formData.message}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-[#FF3366] to-[#FF6B9D] text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-lg disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      무료 상담 신청 <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-sm text-gray-400">
                  영업일 기준 24시간 내에 회신해드립니다
                </p>
              </form>
            </motion.div>

            {/* Contact Info - 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">연락처</h2>

              {contactInfo.map((info, idx) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  {info.action ? (
                    <a href={info.action} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-[#FF3366]/10 flex items-center justify-center group-hover:bg-[#FF3366] transition-colors">
                        <info.icon className="w-6 h-6 text-[#FF3366] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                        <p className="text-gray-600 whitespace-pre-line group-hover:text-[#FF3366] transition-colors">{info.content}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FF3366]/10 flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-[#FF3366]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                        <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-[250px] bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.3476849611395!2d127.02775631531045!3d37.49895797980956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca159bb70b00f%3A0x2a2ee5f6ea5a10af!2z7YWM7Zyk652A66GcIOqwleuCqOq1rCDshJzsmrjtirnrs4Tsi5w!5e0!3m2!1sko!2skr!4v1699999999999!5m2!1sko!2skr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact Bar - Sticky on Mobile */}
      <section className="py-6 px-6 md:px-20 bg-black text-white sticky bottom-0 z-40">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Building2 className="w-8 h-8 text-[#FF3366]" />
              <div>
                <h3 className="text-lg font-bold">빠른 상담이 필요하신가요?</h3>
                <p className="text-sm text-white/60 hidden sm:block">바로 연결해드립니다</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="tel:02-1234-5678"
                className="flex items-center gap-2 px-6 py-3 bg-[#FF3366] text-white font-bold rounded-full hover:bg-[#FF1A4D] transition-colors"
              >
                <Phone className="w-4 h-4" />
                02-1234-5678
              </a>
              <a
                href="https://pf.kakao.com/_xxxxxC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#FEE500] text-black font-bold rounded-full hover:bg-[#FDD800] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                카카오톡
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
