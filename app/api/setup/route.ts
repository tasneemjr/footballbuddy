import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

async function handleSetup() {
  try {
    // Verify database connection
    try {
      await prisma.$connect();
    } catch (error) {
      console.error('Database connection error:', error);
      return NextResponse.json(
        { error: 'Database connection failed. Please check your database configuration.' },
        { status: 500 }
      );
    }

    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: 'admin@footballbuddy.com',
      },
    });

    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'Admin user already exists',
        success: true
      });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@footballbuddy.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'admin',
      },
    });

    return NextResponse.json({ 
      message: 'Admin user created successfully',
      userId: admin.id,
      success: true
    });
  } catch (error) {
    console.error('Error in setup route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create admin user. Please check server logs.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  return handleSetup();
}

export async function POST() {
  return handleSetup();
} 