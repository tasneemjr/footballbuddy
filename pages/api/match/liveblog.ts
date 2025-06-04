import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === "POST") {
    const { entry } = req.body;
    const match = await prisma.liveBlog.upsert({
      where: { matchId: id as string },
      update: {
        entries: { push: entry },
      },
      create: {
        matchId: id as string,
        entries: [entry],
      },
    });
    return res.status(200).json(match);
  }
  res.status(405).end();
}