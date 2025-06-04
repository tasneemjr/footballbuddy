import { GetServerSideProps } from "next";
import { prisma } from "../../lib/prisma";

type TeamProps = {
  team: {
    id: string;
    name: string;
    players: { id: string; name: string }[];
    matchesHome: { id: string; date: string }[];
    matchesAway: { id: string; date: string }[];
  } | null;
};

export default function TeamPage({ team }: TeamProps) {
  if (!team) return <div>Team not found</div>;
  return (
    <div>
      <h1>{team.name}</h1>
      <h2>Players</h2>
      <ul>
        {team.players.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      <h2>Matches</h2>
      <ul>
        {[...team.matchesHome, ...team.matchesAway].map((m) => (
          <li key={m.id}>{new Date(m.date).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const team = await prisma.team.findUnique({
    where: { id },
    include: { players: true, matchesHome: true, matchesAway: true },
  });
  return {
    props: {
      team: team ? JSON.parse(JSON.stringify(team)) : null,
    },
  };
};