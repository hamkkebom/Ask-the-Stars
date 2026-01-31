-- ============================================================
-- 함께봄 Sample Seed Data
-- Run this after the initial schema migration
-- ============================================================

-- Insert sample categories
INSERT INTO categories (id, name, description, slug) VALUES
    (uuid_generate_v4(), '광고/바이럴', '브랜드 광고 및 바이럴 영상', 'ad-viral'),
    (uuid_generate_v4(), '기업 소개', '기업 및 브랜드 소개 영상', 'corporate'),
    (uuid_generate_v4(), '제품 리뷰', '제품 리뷰 및 언박싱 영상', 'product-review'),
    (uuid_generate_v4(), '교육/강의', '교육 및 강의 콘텐츠', 'education'),
    (uuid_generate_v4(), '이벤트/행사', '이벤트 및 행사 영상', 'event'),
    (uuid_generate_v4(), '인터뷰/다큐', '인터뷰 및 다큐멘터리', 'interview-docu'),
    (uuid_generate_v4(), '숏폼/틱톡', '숏폼 콘텐츠', 'shorts'),
    (uuid_generate_v4(), 'MV/뮤직', '뮤직비디오 및 음악 콘텐츠', 'music-video');

-- Note: Users are created through Supabase Auth, not directly inserted
-- After user signup, their record is automatically created in the users table

-- Sample notification templates (for testing)
-- These would be inserted when actual events happen
/*
INSERT INTO notifications (user_id, type, title, message, link) VALUES
    ('user-uuid-here', 'PROJECT', '새 프로젝트가 할당되었습니다', '삼성 브랜드 광고 프로젝트에 참여하게 되었습니다.', '/stars/my-projects'),
    ('user-uuid-here', 'FEEDBACK', '새 피드백이 도착했습니다', '브랜드 영상 v1에 새로운 피드백이 있습니다.', '/stars/feedback'),
    ('user-uuid-here', 'PAYMENT', '정산이 완료되었습니다', '1월 1차 정산 ₩500,000이 입금되었습니다.', '/stars/earnings');
*/

-- Sample lead for testing
INSERT INTO leads (name, email, phone, channel, interest) VALUES
    ('테스트사용자', 'test@example.com', '010-1234-5678', 'Instagram', '기초반');
