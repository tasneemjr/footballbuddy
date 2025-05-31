import { NextResponse } from 'next/server';
import { sendTestEmail } from '@/app/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    const result = await sendTestEmail(email);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Test email sent successfully',
      messageId: result.messageId 
    });
  } catch (error) {
    console.error('Error in test-email route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 