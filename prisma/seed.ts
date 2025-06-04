import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const teamA = await prisma.team.create({ data: { name: "Team A" } });
  const teamB = await prisma.team.create({ data: { name: "Team B" } });

  const match = await prisma.match.create({
    data: {
      date: new Date(),
      homeTeamId: teamA.id,
      awayTeamId: teamB.id,
    },
  });

  await prisma.preview.create({
    data: {
      matchId: match.id,
      content: "This is a preview for Team A vs Team B.",
    },
  });

  await prisma.review.create({
    data: {
      matchId: match.id,
      content: "This is a review for Team A vs Team B.",
    },
  });

  console.log("Sample data created:", { matchId: match.id });
}

main().finally(() => prisma.$disconnect());