import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: 'admin@footballbuddy.com',
      },
    });

    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin user already exists' });
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
      userId: admin.id 
    });
  } catch (error) {
    console.error('Error in setup route:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
} 