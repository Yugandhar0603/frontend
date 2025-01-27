import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Matches() {
    const matches = useSelector((state) => state.matches.matches);
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Matches</h2>
                <button
                    onClick={() => navigate('/create-match')}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                    Create New Match
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match) => (
                    <div key={match.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
                            <span>{match.tournament}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                                match.status === 'Live' ? 'bg-red-500' : 'bg-green-500'
                            }`}>
                                {match.status}
                            </span>
                        </div>
                        
                        <div className="p-4">
                            <div className="mb-4">
                                <div className="text-lg font-semibold text-center mb-2">
                                    {match.team1} vs {match.team2}
                                </div>
                                <div className="text-sm text-gray-600 text-center">
                                    {match.venue}
                                </div>
                            </div>
                            
                            <div className="text-sm text-gray-600">
                                <div className="flex justify-between mb-1">
                                    <span>Date:</span>
                                    <span>{match.date}</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Time:</span>
                                    <span>{match.time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Overs:</span>
                                    <span>{match.overs}</span>
                                </div>
                            </div>
                            
                            <div className="p-4 flex space-x-2">
                                <button 
                                    onClick={() => navigate(`/match/${match.id}`)}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                                >
                                    View Details
                                </button>
                                <button 
                                    onClick={() => navigate(`/score-manager/${match.id}`)}
                                    className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                                >
                                    Manage Score
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {matches.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    No matches created yet. Click "Create New Match" to get started.
                </div>
            )}
        </div>
    );
}

export default Matches; 