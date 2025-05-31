import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Get database statistics
    const userCount = await prisma.user.count();
    const postCount = await prisma.post.count();
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      stats: {
        users: userCount,
        posts: postCount
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 