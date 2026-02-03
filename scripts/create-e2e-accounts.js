#!/usr/bin/env node
/**
 * E2E 테스트 계정 자동 생성 스크립트
 *
 * Supabase에 직접 계정을 생성합니다.
 */

const path = require('path');
const { PrismaClient } = require(
  path.join(__dirname, '../node_modules/@prisma/client')
);
const bcrypt = require(path.join(__dirname, '../apps/api/node_modules/bcrypt'));

const prisma = new PrismaClient();

async function createE2EAccounts() {
  console.log('🚀 E2E 테스트 계정 생성 시작...\n');

  try {
    // 비밀번호 해시 생성
    console.log('🔐 비밀번호 해시 생성 중...');
    const starPasswordHash = await bcrypt.hash('TestPassword123!', 10);
    const adminPasswordHash = await bcrypt.hash('AdminPassword456!', 10);
    console.log('✅ 비밀번호 해시 생성 완료\n');

    // STAR 계정 생성
    console.log('👤 STAR 계정 생성 중...');
    const starUser = await prisma.user.upsert({
      where: { email: 'test-star@hamkkebom.com' },
      update: {
        passwordHash: starPasswordHash,
      },
      create: {
        id: 'e2e-star-test-001',
        email: 'test-star@hamkkebom.com',
        passwordHash: starPasswordHash,
        name: 'Test Star',
        role: 'STAR',
        emailVerified: true,
      },
    });
    console.log(`✅ STAR 계정 생성: ${starUser.email}`);

    // ADMIN 계정 생성
    console.log('👤 ADMIN 계정 생성 중...');
    const adminUser = await prisma.user.upsert({
      where: { email: 'test-admin@hamkkebom.com' },
      update: {
        passwordHash: adminPasswordHash,
      },
      create: {
        id: 'e2e-admin-test-001',
        email: 'test-admin@hamkkebom.com',
        passwordHash: adminPasswordHash,
        name: 'Test Admin',
        role: 'ADMIN',
        emailVerified: true,
      },
    });
    console.log(`✅ ADMIN 계정 생성: ${adminUser.email}`);

    console.log('\n📊 생성된 계정 정보:');
    console.log('─'.repeat(60));
    console.log(`ID: ${starUser.id}`);
    console.log(`Email: ${starUser.email}`);
    console.log(`Name: ${starUser.name}`);
    console.log(`Role: ${starUser.role}`);
    console.log(`Email Verified: ${starUser.emailVerified}`);
    console.log('─'.repeat(60));
    console.log(`ID: ${adminUser.id}`);
    console.log(`Email: ${adminUser.email}`);
    console.log(`Name: ${adminUser.name}`);
    console.log(`Role: ${adminUser.role}`);
    console.log(`Email Verified: ${adminUser.emailVerified}`);
    console.log('─'.repeat(60));

    console.log('\n🎉 E2E 테스트 계정 생성 완료!');
    console.log('\n✅ 다음 단계:');
    console.log('   1. pnpm setup:verify  # 환경 변수 확인');
    console.log('   2. pnpm e2e           # E2E 테스트 실행');
  } catch (error) {
    console.error('\n❌ 에러 발생:', error.message);
    if (error.code === 'P2002') {
      console.log(
        '\nℹ️  계정이 이미 존재합니다. 비밀번호 해시가 업데이트되었습니다.'
      );
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createE2EAccounts().catch((error) => {
  console.error(error);
  process.exit(1);
});
