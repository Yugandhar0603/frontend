import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateTournament() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tournamentDetails, setTournamentDetails] = useState({
        name: '',
        startDate: '',
        endDate: '',
        venue: '',
        format: 'T20', // T20, ODI, Test
        numberOfTeams: '',
        prizePool: '',
        registrationDeadline: '',
        description: '',
        rules: '',
        entryFee: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would dispatch an action to add the tournament
        console.log('Tournament created:', tournamentDetails);
        navigate('/organizer-dashboard');
    };

    const handleChange = (e) => {
        setTournamentDetails({
            ...tournamentDetails,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Create New Tournament</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tournament Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={tournamentDetails.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Format
                            </label>
                            <select
                                name="format"
                                value={tournamentDetails.format}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="T20">T20</option>
                                <option value="ODI">ODI</option>
                                <option value="Test">Test</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={tournamentDetails.startDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={tournamentDetails.endDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Venue
                            </label>
                            <input
                                type="text"
                                name="venue"
                                value={tournamentDetails.venue}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Teams
                            </label>
                            <input
                                type="number"
                                name="numberOfTeams"
                                value={tournamentDetails.numberOfTeams}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                                min="2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Prize Pool (₹)
                            </label>
                            <input
                                type="number"
                                name="prizePool"
                                value={tournamentDetails.prizePool}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Entry Fee per Team (₹)
                            </label>
                            <input
                                type="number"
                                name="entryFee"
                                value={tournamentDetails.entryFee}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tournament Description
                        </label>
                        <textarea
                            name="description"
                            value={tournamentDetails.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tournament Rules
                        </label>
                        <textarea
                            name="rules"
                            value={tournamentDetails.rules}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/organizer-dashboard')}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Create Tournament
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTournament; 