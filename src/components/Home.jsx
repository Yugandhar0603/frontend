import React from 'react';

function Home() {
    const liveMatches = [
        {
            id: 1,
            team1: "Royal Challengers Bangalore",
            team2: "Mumbai Indians",
            score1: "186/3",
            overs1: "18.4",
            score2: "165/5",
            overs2: "17.2",
            venue: "Greenfield Stadium"
        },
        {
            id: 2,
            team1: "Chennai Super Kings",
            team2: "Delhi Capitals",
            score1: "142/4",
            overs1: "15.2",
            score2: "98/3",
            overs2: "12.0",
            venue: "Medical College Ground"
        }
    ];

    const upcomingMatches = [
        {
            id: 1,
            team1: "Kolkata Knight Riders",
            team2: "Punjab Kings",
            venue: "Central Stadium",
            date: "2024-02-20",
            time: "19:30"
        },
        {
            id: 2,
            team1: "Rajasthan Royals",
            team2: "Lucknow Super Giants",
            venue: "University Stadium",
            date: "2024-02-21",
            time: "15:30"
        },
        {
            id: 3,
            team1: "Sunrisers Hyderabad",
            team2: "Gujarat Titans",
            venue: "Medical College",
            date: "2024-02-22",
            time: "19:30"
        }
    ];

    const recentMatches = [
        {
            id: 1,
            team1: "Gujarat Titans",
            team2: "Punjab Kings",
            result: "GT won by 6 wickets",
            score1: "175/8",
            score2: "176/4",
            date: "2024-02-15"
        },
        {
            id: 2,
            team1: "Lucknow Super Giants",
            team2: "Delhi Capitals",
            result: "LSG won by 8 wickets",
            score1: "145/9",
            score2: "146/2",
            date: "2024-02-14"
        },
        {
            id: 3,
            team1: "Mumbai Indians",
            team2: "Rajasthan Royals",
            result: "MI won by 5 wickets",
            score1: "165/7",
            score2: "166/5",
            date: "2024-02-13"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
                My Matches
            </h1>
            <div className="grid grid-cols-1 gap-8">
                {/* Live Matches Table */}
                <div className="bg-black rounded-lg shadow-xl overflow-hidden">
                    <div className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-800">
                        <h2 className="text-xl font-bold text-white">Live Matches</h2>
                        <span className="ml-3 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full animate-pulse">
                            LIVE
                        </span>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-6 py-3 text-left text-white">Teams</th>
                                <th className="px-6 py-3 text-left text-white">Score</th>
                                <th className="px-6 py-3 text-left text-white">Venue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {liveMatches.map((match) => (
                                <tr key={match.id} className="hover:bg-gray-900">
                                    <td className="px-6 py-4 text-white font-semibold">
                                        {match.team1} vs {match.team2}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-red-400">
                                            {match.team1}: {match.score1} ({match.overs1} ov)
                                        </div>
                                        <div className="text-red-400">
                                            {match.team2}: {match.score2} ({match.overs2} ov)
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white">{match.venue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Upcoming Matches Table */}
                <div className="bg-black rounded-lg shadow-xl overflow-hidden">
                    <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600">
                        <h2 className="text-xl font-bold text-white">Upcoming Matches</h2>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-6 py-3 text-left text-white">Teams</th>
                                <th className="px-6 py-3 text-left text-white">Venue</th>
                                <th className="px-6 py-3 text-left text-white">Schedule</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {upcomingMatches.map((match) => (
                                <tr key={match.id} className="hover:bg-gray-900">
                                    <td className="px-6 py-4 text-white font-semibold">
                                        {match.team1} vs {match.team2}
                                    </td>
                                    <td className="px-6 py-4 text-white">{match.venue}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-green-400">{match.date}</div>
                                        <div className="text-gray-400 text-sm">{match.time} IST</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Recent Matches Table */}
                <div className="bg-black rounded-lg shadow-xl overflow-hidden">
                    <div className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600">
                        <h2 className="text-xl font-bold text-white">Recent Matches</h2>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-6 py-3 text-left text-white">Teams</th>
                                <th className="px-6 py-3 text-left text-white">Result</th>
                                <th className="px-6 py-3 text-left text-white">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {recentMatches.map((match) => (
                                <tr key={match.id} className="hover:bg-gray-900">
                                    <td className="px-6 py-4 text-white font-semibold">
                                        {match.team1} vs {match.team2}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-purple-400">{match.result}</div>
                                        <div className="text-gray-400 text-sm">
                                            {match.score1} | {match.score2}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white">{match.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home; 