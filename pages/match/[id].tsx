import { GetServerSideProps } from "next";
import { prisma } from "../../lib/prisma";

type MatchProps = {
  match: {
    id: string;
    date: string;
    homeTeam: { name: string };
    awayTeam: { name: string };
    preview?: { content: string };
    review?: { content: string };
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
