import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const appUrl = process.env.WEB_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetLink = `${appUrl}/auth/reset-password?token=${token}`;
    const mailFrom = process.env.MAIL_FROM || 'onboarding@resend.dev';

    try {
      const data = await this.resend.emails.send({
        from: mailFrom,
        to: [to],
        subject: '[별들에게 물어봐] 비밀번호 재설정 링크입니다.',
        html: `
          <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin: 0;">비밀번호 재설정</h1>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              안녕하세요,<br/>
              비밀번호 재설정을 요청하셔서 이메일을 보내드립니다.<br/>
              아래 버튼을 클릭하여 새로운 비밀번호를 설정해주세요.
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);">
                비밀번호 재설정하기
              </a>
            </div>

            <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin-bottom: 12px;">
              본인이 요청하지 않았다면 이 이메일을 무시하셔도 됩니다.<br/>
              링크는 24시간 동안 유효합니다.
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
              © 2026 한깨봄 (Ask the Stars). All rights reserved.
            </p>
          </div>
        `,
      });

      if (data.error) {
        this.logger.error(`Resend API Error: ${JSON.stringify(data.error)}`);
        throw new Error(data.error.message);
      }

      this.logger.log(`Password reset email sent: ${data.data?.id}`);
    } catch (error) {
      this.logger.error(`Failed to send password reset email to ${to}`, error);
      if (process.env.NODE_ENV === 'production') {
        throw new Error('이메일 전송에 실패했습니다.');
      }
    }
  }
}
