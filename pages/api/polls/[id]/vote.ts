import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "POST") {
    const { answer } = req.body;
    const userId = "demo-user-id"; // Replace with real user ID if you have auth

    try {
      await prisma.userResponse.create({
        data: {
          pollId: id as string,
          userId,
          answer,
        },
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to submit vote" });
    }
  }

  res.status(405).end();
}