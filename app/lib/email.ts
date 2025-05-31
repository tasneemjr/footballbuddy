import { Resend } from 'resend';

// Initialize Resend with a default empty string if API key is not available
// This prevents build errors while still requiring the API key for actual email sending
const resend = new Resend(process.env.RESEND_API_KEY || '');

export const sendTestEmail = async (to: string) => {
  try {
    // Check if API key is available
    if (!process.env.RESEND_API_KEY) {
      console.warn('Resend API key not found');
      return { success: false, error: 'API key not configured' };
    }

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject: 'Test Email from Football Buddy',
      html: '<h1>Email Test Successful!</h1><p>If you receive this email, your email configuration is working correctly!</p>',
    });

    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}; 