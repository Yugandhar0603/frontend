import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function MyMatches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const userData = JSON.parse(sessionStorage.getItem('userData'));
                const username = userData.name;
                const userResponse = await fetch(`http://localhost:8090/api/auth/user-id/${username}`);
                if (!userResponse.ok) throw new Error('Failed to fetch user ID');
                const userId = await userResponse.json();
                const playerResponse = await fetch(`http://localhost:2024/api/players/player-id/${userId}`);
                if (!playerResponse.ok) throw new Error('Failed to fetch player ID');
                const playerId = await playerResponse.json();
                const matchesResponse = await fetch(`http://localhost:7070/api/team-players/matches/${playerId}`);
                if (!matchesResponse.ok) throw new Error('Failed to fetch matches');
                const matchesData = await matchesResponse.json();
                setMatches(matchesData);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching matches:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center mt-8">
            <div className="text-white text-xl font-semibold animate-pulse">
                Loading your matches...
            </div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center mt-8">
            <div className="bg-red-500/10 text-red-500 px-4 py-3 rounded-lg border border-red-500/20">
                Error: {error}
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 rounded-xl p-8 backdrop-blur-lg border-2 border-blue-400/30 shadow-2xl shadow-blue-900/30">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <span className="bg-gradient-to-r from-blue-300 via-white to-purple-300 text-transparent bg-clip-text">
                        My Upcoming Matches
                    </span>
                    <div className="ml-4 px-3 py-1 bg-blue-600/40 rounded-full text-blue-200 text-sm border border-blue-400/30">
                        {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
                    </div>
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {matches.map((match, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-800/80 to-blue-800/80 rounded-xl transform group-hover:scale-105 transition-transform duration-300 -z-10" />
                            <div className="bg-black/85 backdrop-blur-lg p-6 rounded-xl border-2 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 shadow-lg shadow-blue-900/20">
                                <div className="text-white">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex flex-col items-start space-y-1">
                                            <span className="text-sm text-blue-300 font-semibold">Your Team</span>
                                            <span className="font-bold text-white">{match.myTeamName}</span>
                                        </div>
                                        <span className="text-white font-bold px-4 py-2 bg-blue-900/50 rounded-lg border border-blue-400/20">VS</span>
                                        <div className="flex flex-col items-end space-y-1">
                                            <span className="text-sm text-purple-300 font-semibold">Opponent</span>
                                            <span className="font-bold text-white">{match.opponentTeamName}</span>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4 pt-4 border-t border-blue-500/20">
                                        <span className="text-sm text-blue-300 font-semibold">Match Date</span>
                                        <div className="text-white font-medium mt-1">
                                            {new Date(match.matchDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {matches.length === 0 && (
                        <div className="col-span-full">
                            <div className="flex flex-col items-center justify-center p-8 bg-black/90 rounded-xl border-2 border-blue-500/30 shadow-lg shadow-blue-900/20">
                                <div className="text-4xl mb-4">🏏</div>
                                <div className="text-white text-lg font-bold">
                                    No upcoming matches found
                                </div>
                                <div className="text-blue-300 text-sm mt-2 font-medium">
                                    Check back later for new matches
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyMatches;