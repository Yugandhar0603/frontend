import React from 'react';
import { useNavigate } from 'react-router-dom';

function LiveMatches() {
    const navigate = useNavigate();

    const liveMatches = [
        {
            id: 1,
            team1: { name: "Mumbai Indians", score: "186/4", overs: "18.2" },
            team2: { name: "Chennai Super Kings", score: "165/5", overs: "17.0" },
            venue: "Wankhede Stadium",
            currentBatsman: "Rohit Sharma* (76)",
            currentBowler: "D Chahar (3/28)"
        },
        {
            id: 2,
            team1: { name: "Royal Challengers", score: "142/3", overs: "15.0" },
            team2: { name: "Delhi Capitals", score: "0/0", overs: "0.0" },
            venue: "Chinnaswamy Stadium",
            currentBatsman: "Virat Kohli* (82)",
            currentBowler: "A Nortje (2/35)"
        }
    ];

    const upcomingMatches = [
        {
            id: 1,
            team1: "Kolkata Knight Riders",
            team2: "Punjab Kings",
            venue: "Eden Gardens",
            date: "2024-02-20",
            time: "19:30"
        },
        {
            id: 2,
            team1: "Rajasthan Royals",
            team2: "Lucknow Giants",
            venue: "Sawai Stadium",
            date: "2024-02-21",
            time: "15:30"
        },
        {
            id: 3,
            team1: "Gujarat Titans",
            team2: "Hyderabad",
            venue: "Motera Stadium",
            date: "2024-02-22",
            time: "19:30"
        }
    ];

    const recentMatches = [
        {
            id: 1,
            team1: "Punjab Kings",
            team2: "Delhi Capitals",
            result: "PBKS won by 6 wickets",
            score1: "175/8",
            score2: "176/4",
            date: "2024-02-15"
        },
        {
            id: 2,
            team1: "Mumbai Indians",
            team2: "Rajasthan Royals",
            result: "MI won by 5 wickets",
            score1: "165/7",
            score2: "166/5",
            date: "2024-02-14"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
                Cricket Matches
            </h1>

            {/* Grid container for all tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Live Matches */}
                <div className="bg-black rounded-lg shadow-xl overflow-hidden">
                    <div className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-800">
                        <h2 className="text-lg font-bold text-white">Live Matches</h2>
                        <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full animate-pulse">
                            LIVE
                        </span>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-3 py-2 text-left text-white text-sm">Teams</th>
                                <th className="px-3 py-2 text-left text-white text-sm">Score</th>
                                <th className="px-3 py-2 text-left text-white text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {liveMatches.map((match) => (
                                <tr key={match.id} className="hover:bg-gray-900">
                                    <td className="px-3 py-2 text-white text-sm">
                                        {match.team1.name} vs {match.team2.name}
                                    </td>
                                    <td className="px-3 py-2 text-sm">
                                        <div className="text-red-400">
                                            {match.team1.score} ({match.team1.overs})
                                        </div>
                                        <div className="text-red-400">
                                            {match.team2.score} ({match.team2.overs})
                                        </div>
                                    </td>
                                    <td className="px-3 py-2 text-green-400 text-sm">
                                        {match.currentBatsman}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Upcoming Matches */}
                <div className="bg-black rounded-lg shadow-xl overflow-hidden">
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600">
                        <h2 className="text-lg font-bold text-white">Upcoming Matches</h2>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-3 py-2 text-left text-white text-sm">Teams</th>
                                <th className="px-3 py-2 text-left text-white text-sm">Schedule</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {upcomingMatches.map((match) => (
                                <tr key={match.id} className="hover:bg-gray-900">
                                    <td className="px-3 py-2 text-white text-sm">
                                        {match.team1} vs {match.team2}
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="text-green-400 text-sm">{match.date}</div>
                                        <div className="text-gray-400 text-xs">{match.time}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Recent Matches */}
                <div className="bg-black rounded-lg shadow-xl overflow-hidden">
                    <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600">
                        <h2 className="text-lg font-bold text-white">Recent Matches</h2>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-3 py-2 text-left text-white text-sm">Teams</th>
                                <th className="px-3 py-2 text-left text-white text-sm">Result</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {recentMatches.map((match) => (
                                <tr key={match.id} className="hover:bg-gray-900">
                                    <td className="px-3 py-2 text-white text-sm">
                                        {match.team1} vs {match.team2}
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="text-purple-400 text-sm">{match.result}</div>
                                        <div className="text-gray-400 text-xs">{match.score1}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LiveMatches; 