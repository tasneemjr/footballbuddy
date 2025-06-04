import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav style={{ marginBottom: 20 }}>
        <a href="/match/your-match-id" style={{ marginRight: 10 }}>Matches</a>
        <a href="/team/your-team-id" style={{ marginRight: 10 }}>Teams</a>
        <a href="/players/your-player-id" style={{ marginRight: 10 }}>Players</a>
        <a href="/community" style={{ marginRight: 10 }}>Community</a>
        <a href="/polls" style={{ marginRight: 10 }}>Polls</a>
        <a href="/polls/your-poll-id">Poll Details</a>
      </nav>
      <Component {...pageProps} />
    </>
  );
}