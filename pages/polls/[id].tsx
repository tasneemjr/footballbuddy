import { GetServerSideProps } from "next";
import { prisma } from "../../lib/prisma";
import { useState } from "react";

type PollProps = {
  poll: {
    id: string;
    question: string;
    options: string[];
  } | null;
};

export default function PollPage({ poll }: PollProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!poll) return <div style={{ color: "red" }}>Poll not found</div>;

  const handleVote = async () => {
    if (!selected) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/polls/${poll.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: selected }),
      });
      if (!res.ok) throw new Error("Failed to submit vote");
      setSubmitted(true);
    } catch (err) {
      setError("Failed to submit vote. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>{poll.question}</h1>
      {poll.options.map((opt) => (
        <div key={opt}>
          <label>
            <input
              type="radio"
              name="option"
              value={opt}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
              disabled={submitted || loading}
            />
            {opt}
          </label>
        </div>
      ))}
      <button onClick={handleVote} disabled={!selected || submitted || loading}>
        {loading ? "Submitting..." : submitted ? "Voted!" : "Vote"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {submitted && <p style={{ color: "green" }}>Thank you for voting!</p>}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const poll = await prisma.poll.findUnique({
    where: { id },
  });
  return {
    props: {
      poll: poll ? JSON.parse(JSON.stringify(poll)) : null,
    },
  };
};