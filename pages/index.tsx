export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">Welcome to FootballBuddy!</h1>
      <p className="mb-8 text-lg text-gray-700">Your home for football polls, matches, teams, and more.</p>
      <div className="flex space-x-4">
        <a href="/polls" className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">Polls</a>
        <a href="/matches" className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700 transition">Matches</a>
        <a href="/teams" className="px-6 py-3 bg-yellow-600 text-white rounded shadow hover:bg-yellow-700 transition">Teams</a>
        <a href="/players" className="px-6 py-3 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition">Players</a>
        <a href="/community" className="px-6 py-3 bg-pink-600 text-white rounded shadow hover:bg-pink-700 transition">Community</a>
      </div>
    </div>
  );
}