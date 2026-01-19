'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CounselorProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: '김태희',
    specialty: ['사주', '신년운세'],
    bio: '20년 경력의 사주 전문가입니다. 하루에 한 분 한 분 정성을 다해 상담합니다.',
    introduction: '안녕하세요, 김태희 상담사입니다. 어려운 일이 있으신가요? 사주와 운세로 함께 해결책을 찾아보아요.',
    phone: '010-****-1234',
    email: 'kimth@example.com',
    bankInfo: '국민은행 ***-***-1234',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    // TODO: API call to save profile
    alert('프로필이 저장되었습니다.');
    setIsEditing(false);
  };

  const specialtyOptions = ['사주', '타로', '신점', '관상', '신년운세', '연애운', '재물운', '인간관계'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">프로필 설정</h1>
          <p className="mt-1 text-gray-600">
            상담사 프로필을 관리하세요
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          {/* Profile Image */}
          <div className="flex items-center gap-6 mb-6 pb-6 border-b">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-4xl">
              🔮
            </div>
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-gray-500">상담사</p>
              <button className="mt-2 text-sm text-blue-600 hover:underline">
                프로필 사진 변경
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름
              </label>
              <input
                type="text"
                value={profile.name}
                disabled={!isEditing}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100"
              />
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전문 분야
              </label>
              <div className="flex flex-wrap gap-2">
                {specialtyOptions.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    disabled={!isEditing}
                    onClick={() => {
                      if (profile.specialty.includes(spec)) {
                        setProfile({ ...profile, specialty: profile.specialty.filter((s) => s !== spec) });
                      } else {
                        setProfile({ ...profile, specialty: [...profile.specialty, spec] });
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      profile.specialty.includes(spec)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    } ${!isEditing ? 'cursor-not-allowed' : 'hover:opacity-80'}`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                한줄 소개
              </label>
              <input
                type="text"
                value={profile.bio}
                disabled={!isEditing}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100"
                maxLength={100}
              />
              <p className="text-xs text-gray-400 mt-1">{profile.bio.length}/100</p>
            </div>

            {/* Introduction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상세 소개
              </label>
              <textarea
                value={profile.introduction}
                disabled={!isEditing}
                onChange={(e) => setProfile({ ...profile, introduction: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">연락처 정보</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                전화번호
              </label>
              <input
                type="text"
                value={profile.phone}
                disabled
                className="w-full border rounded-lg px-4 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full border rounded-lg px-4 py-2 bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Bank Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">정산 계좌</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              계좌 정보
            </label>
            <input
              type="text"
              value={profile.bankInfo}
              disabled
              className="w-full border rounded-lg px-4 py-2 bg-gray-100"
            />
            <button className="mt-2 text-sm text-blue-600 hover:underline">
              계좌 정보 변경 요청
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
              >
                저장
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
            >
              수정
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
