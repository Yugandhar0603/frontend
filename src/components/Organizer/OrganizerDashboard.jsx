import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaMapMarkerAlt, FaClipboardList, FaHistory } from 'react-icons/fa';
import { MdSportsCricket } from 'react-icons/md';

function OrganizerDashboard() {
    const navigate = useNavigate();

    const organizerFeatures = [
        {
            title: 'Create Match',
            description: 'Schedule new cricket matches',
            icon: <MdSportsCricket className="text-4xl text-green-600" />,
            path: '/create-match'
        },
        {
            title: 'Manage Teams',
            description: 'Add and manage cricket teams',
            icon: <FaUsers className="text-4xl text-blue-600" />,
            path: '/manage-teams'
        },
        {
            title: 'Venues',
            description: 'Manage cricket grounds and venues',
            icon: <FaMapMarkerAlt className="text-4xl text-red-600" />,
            path: '/venues'
        },
        {
            title: 'Live Scoring',
            description: 'Manage live match scores',
            icon: <MdSportsCricket className="text-4xl text-purple-600" />,
            path: '/matches'
        },
        {
            title: 'Match History',
            description: 'View past matches and statistics',
            icon: <FaHistory className="text-4xl text-orange-600" />,
            path: '/match-history'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Organizer Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {organizerFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                            onClick={() => navigate(feature.path)}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Stats Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-2">Active Matches</h3>
                        <p className="text-3xl font-bold text-green-600">3</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-2">Total Teams</h3>
                        <p className="text-3xl font-bold text-blue-600">12</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-2">Upcoming Matches</h3>
                        <p className="text-3xl font-bold text-orange-600">5</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b">
                            <p className="text-gray-600">New match created: Team A vs Team B</p>
                            <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                        <div className="p-4 border-b">
                            <p className="text-gray-600">Score updated: Match #123</p>
                            <p className="text-sm text-gray-500">3 hours ago</p>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-600">New team registered: Thunder Kings</p>
                            <p className="text-sm text-gray-500">5 hours ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrganizerDashboard; 