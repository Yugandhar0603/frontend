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
            <div className="bg-gradient-to-r from-purple-800/20 to-blue-800/20 rounded-xl p-8 backdrop-blur-sm border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                        My Upcoming Matches
                    </span>
                    <div className="ml-4 px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 text-sm">
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
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl transform group-hover:scale-105 transition-transform duration-300 -z-10" />
                            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                                <div className="text-white">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex flex-col items-start space-y-1">
                                            <span className="text-sm text-blue-400">Your Team</span>
                                            <span className="font-semibold">{match.myTeamName}</span>
                                        </div>
                                        <span className="text-white/60 font-bold px-4 py-2 bg-white/5 rounded-lg">VS</span>
                                        <div className="flex flex-col items-end space-y-1">
                                            <span className="text-sm text-purple-400">Opponent</span>
                                            <span className="font-semibold">{match.opponentTeamName}</span>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4 pt-4 border-t border-white/10">
                                        <span className="text-sm text-white/60">Match Date</span>
                                        <div className="text-white/90 font-medium mt-1">
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
                            <div className="flex flex-col items-center justify-center p-8 bg-black/30 rounded-xl border border-white/10">
                                <div className="text-4xl mb-4">🏏</div>
                                <div className="text-white/70 text-lg font-medium">
                                    No upcoming matches found
                                </div>
                                <div className="text-white/40 text-sm mt-2">
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