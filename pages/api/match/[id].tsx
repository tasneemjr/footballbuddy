import { GetServerSideProps } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type MatchProps = {
  match: {
    id: string;
    date: string;
    homeTeam: { name: string };
    awayTeam: { name: string };
    preview?: { content: string };
    review?: { content: string };
    liveBlog?: { entries: string[] };
  } | null;
};

export default function MatchPage({ match }: MatchProps) {
  if (!match) return <div>Match not found</div>;

  return (
    <div>
      <h1>
        {match.homeTeam.name} vs {match.awayTeam.name}
      </h1>
      <p>Date: {new Date(match.date).toLocaleString()}</p>
      {match.preview && (
        <>
          <h2>Preview</h2>
          <p>{match.preview.content}</p>
        </>
      )}
      {match.review && (
        <>
          <h2>Review</h2>
          <p>{match.review.content}</p>
        </>
      )}
      {match.liveBlog && (
        <>
          <h2>Live Blog</h2>
          <ul>
            {Array.isArray(match.liveBlog.entries) &&
              match.liveBlog.entries.map((entry: string, idx: number) => (
                <li key={idx}>{entry}</li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const match = await prisma.match.findUnique({
      where: { id: id },
      include: {
        homeTeam: true,
        awayTeam: true,
        preview: true,
        review: true,
      },
    });

    return {
      props: {
        match: match ? JSON.parse(JSON.stringify(match)) : null,
      },
    };
};