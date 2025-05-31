import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export async function GET() {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          status: 'unhealthy',
          error: 'DATABASE_URL environment variable is not set'
        },
        { status: 500 }
      );
    }

    // Test database connection
    await prisma.$connect();
    
    // Get database statistics
    const userCount = await prisma.user.count();
    const postCount = await prisma.post.count();
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      databaseUrl: process.env.DATABASE_URL.split('?')[0], // Only show base URL without credentials
      stats: {
        users: userCount,
        posts: postCount
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    // Determine the specific error type
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      if (error.message.includes('connect ECONNREFUSED')) {
        errorMessage = 'Database connection refused. Please check if the database is running and accessible.';
      } else if (error.message.includes('authentication failed')) {
        errorMessage = 'Database authentication failed. Please check your credentials.';
      } else if (error.message.includes('database') && error.message.includes('does not exist')) {
        errorMessage = 'Database does not exist. Please create the database first.';
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      {
        status: 'unhealthy',
        error: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 