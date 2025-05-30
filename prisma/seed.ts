import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user with a more secure password
  const adminPassword = await bcrypt.hash('FB@admin#2024$secure', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@footballbuddy.com' },
    update: {
      password: adminPassword
    },
    create: {
      email: 'admin@footballbuddy.com',
      name: 'Admin',
      password: adminPassword,
      role: 'admin',
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 