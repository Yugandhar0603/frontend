import React, { useState } from 'react';

function ManageTeams() {
    const [teams, setTeams] = useState([
        {
            id: 1,
            name: "Royal Challengers Bangalore",
            players: [
                { id: 1, name: "Virat Kohli", role: "Batsman", captain: true },
                { id: 2, name: "Faf du Plessis", role: "Batsman" },
                { id: 3, name: "Glenn Maxwell", role: "All-rounder" },
            ]
        },
        {
            id: 2,
            name: "Hyderabad Hawks",
            players: [
                { id: 1, name: "Yugandhar", role: "Batsman", captain: true },
                { id: 2, name: "Akhil", role: "All-rounder" },
                { id: 3, name: "Vishruth", role: "Bowler" },
            ]
        }
    ]);

    const [newTeam, setNewTeam] = useState({
        name: '',
        players: []
    });

    const [newPlayer, setNewPlayer] = useState({
        name: '',
        role: 'Batsman',
        captain: false
    });

    const handleAddTeam = () => {
        if (newTeam.name) {
            setTeams([...teams, { ...newTeam, id: teams.length + 1 }]);
            setNewTeam({ name: '', players: [] });
        }
    };

    const handleAddPlayer = (teamId) => {
        if (newPlayer.name) {
            setTeams(teams.map(team => {
                if (team.id === teamId) {
                    return {
                        ...team,
                        players: [...team.players, { ...newPlayer, id: team.players.length + 1 }]
                    };
                }
                return team;
            }));
            setNewPlayer({ name: '', role: 'Batsman', captain: false });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Manage Teams</h2>

                {/* Add New Team */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Add New Team</h3>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={newTeam.name}
                            onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter team name"
                        />
                        <button
                            onClick={handleAddTeam}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Add Team
                        </button>
                    </div>
                </div>

                {/* Existing Teams */}
                {teams.map((team) => (
                    <div key={team.id} className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h3 className="text-xl font-semibold mb-4">{team.name}</h3>
                        
                        {/* Players List */}
                        <div className="mb-4">
                            <h4 className="font-medium mb-2">Players</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {team.players.map((player) => (
                                    <div 
                                        key={player.id}
                                        className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {player.name} 
                                                {player.captain && <span className="ml-2 text-green-600">(C)</span>}
                                            </p>
                                            <p className="text-sm text-gray-600">{player.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Add New Player Form */}
                        <div className="border-t pt-4">
                            <h4 className="font-medium mb-2">Add New Player</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    value={newPlayer.name}
                                    onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Player name"
                                />
                                <select
                                    value={newPlayer.role}
                                    onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="Batsman">Batsman</option>
                                    <option value="Bowler">Bowler</option>
                                    <option value="All-rounder">All-rounder</option>
                                </select>
                                <button
                                    onClick={() => handleAddPlayer(team.id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Add Player
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageTeams; 