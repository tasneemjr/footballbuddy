import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const polls = await prisma.poll.findMany();
    return res.status(200).json(polls);
  }
  if (req.method === "POST") {
    const { question, options } = req.body;
    if (!question || !options || !Array.isArray(options)) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const poll = await prisma.poll.create({
      data: {
        question,
        options,
      },
    });
    return res.status(201).json(poll);
  }
  res.status(405).end();
}