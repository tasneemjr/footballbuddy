import { useState } from "react";

interface MatchProps {
  match: any; // Replace 'any' with the actual type of 'match'
}

export default function MatchPage({ match }: MatchProps) {
  if (!match) return <div>Match not found</div>;

  const [liveEntry, setLiveEntry] = useState("");
  const [savingLive, setSavingLive] = useState(false);

  const handleLiveBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingLive(true);
    await fetch(`/api/match/liveblog?id=${match.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entry: liveEntry }),
    });
    setSavingLive(false);
    setLiveEntry("");
    // Optionally, reload data or show a success message
  };

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
      <h2>Add Live Blog Entry</h2>
      <form onSubmit={handleLiveBlogSubmit}>
        <input
          type="text"
          value={liveEntry}
          onChange={(e) => setLiveEntry(e.target.value)}
          placeholder="Enter live update"
        />
        <button type="submit" disabled={savingLive || !liveEntry}>
          {savingLive ? "Saving..." : "Add Entry"}
        </button>
      </form>
      {/* ...existing live blog display... */}
    </div>
  );
}