import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

async function main(): Promise<void> {
  try {
    // Retrieve all Match records from the database
    const matches = await prisma.match.findMany();
    console.log('Matches:', matches);
  } catch (error) {
    console.error('Error querying matches:', error);
  } finally {
    // Disconnect Prisma Client at the end to close database connections
    await prisma.$disconnect();
  }
}

// Run the main function
main();

