import "../styles/globals.css";
import { GetServerSideProps } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import { useState } from "react";

type PollProps = {
  poll: {
    id: string;
    question: string;
    options: string[];
    userResponses: { answer: string }[];
  } | null;
};

export default function PollPage({ poll }: PollProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ [option: string]: number } | null>(null);

  if (!poll) return <div className="text-red-600">Poll not found</div>;

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

      // Calculate results
      const allResponses = [...poll.userResponses, { answer: selected }];
      const counts: { [option: string]: number } = {};
      poll.options.forEach(opt => counts[opt] = 0);
      allResponses.forEach(r => { if (counts[r.answer] !== undefined) counts[r.answer]++; });
      setResults(counts);
    } catch (err) {
      setError("Failed to submit vote. Please try again.");
    }
    setLoading(false);
  };

  // Calculate initial results if already voted
  const initialResults: { [option: string]: number } = {};
  poll.options.forEach(opt => initialResults[opt] = 0);
  poll.userResponses.forEach(r => { if (initialResults[r.answer] !== undefined) initialResults[r.answer]++; });

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">{poll.question}</h1>
      <form>
        {poll.options.map((opt) => (
          <div key={opt} className="mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="option"
                value={opt}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
                disabled={submitted || loading}
                className="accent-blue-600"
              />
              <span>{opt}</span>
            </label>
          </div>
        ))}
        <button
          type="button"
          onClick={handleVote}
          disabled={!selected || submitted || loading}
          className={`mt-4 px-4 py-2 rounded text-white ${
            submitted
              ? "bg-green-500 cursor-not-allowed"
              : loading
              ? "bg-blue-400 cursor-wait"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : submitted ? "Voted!" : "Vote"}
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {submitted && (
        <div>
          <p className="mt-4 text-green-600">Thank you for voting!</p>
          <h3 className="font-semibold mt-4">Results:</h3>
          <ul>
            {Object.entries(results || initialResults).map(([opt, count]) => (
              <li key={opt}>
                {opt}: {count} vote{count !== 1 ? "s" : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const poll = await prisma.poll.findUnique({
    where: { id },
    include: { responses: true },
  });
  return {
    props: {
      poll: poll ? JSON.parse(JSON.stringify(poll)) : null,
    },
  };
};