import { GetServerSideProps } from "next";
import { prisma } from "../../lib/prisma";

type PlayerProps = {
  player: {
    id: string;
    name: string;
    team?: { id: string; name: string };
    stats?: any;
  } | null;
};

export default function PlayerPage({ player }: PlayerProps) {
  if (!player) return <div>Player not found</div>;
  return (
    <div>
      <h1>{player.name}</h1>
      <p>Team: {player.team?.name || "Free Agent"}</p>
      <pre>{JSON.stringify(player.stats, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const player = await prisma.player.findUnique({
    where: { id },
    include: { team: true },
  });
  return {
    props: {
      player: player ? JSON.parse(JSON.stringify(player)) : null,
    },
  };
};