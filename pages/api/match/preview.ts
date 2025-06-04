import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === "POST") {
    const { content } = req.body;
    const preview = await prisma.preview.upsert({
      where: { matchId: id as string },
      update: { content },
      create: { matchId: id as string, content },
    });
    return res.status(200).json(preview);
  }
  res.status(405).end();
}