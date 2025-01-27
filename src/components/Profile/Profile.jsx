import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                    <div className="md:flex">
                        {/* Profile Image */}
                        <div className="md:w-1/3">
                            <img 
                                src="https://m.photos.timesofindia.com/thumb.cms?msid=11374645&width=500&resizemode=4" 
                                alt="Virat Kohli" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Basic Info */}
                        <div className="p-8 md:w-2/3">
                            <div className="uppercase tracking-wide text-sm text-green-500 font-semibold">
                                User ID: {user?.id || 'VK18_2024'}
                            </div>
                            <h1 className="mt-2 text-4xl font-bold text-gray-900">Virat Kohli</h1>
                            <p className="mt-2 text-gray-600">Right Handed Batsman</p>
                            
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-500">Born</p>
                                    <p className="font-semibold">5 November 1988, Delhi</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Teams</p>
                                    <p className="font-semibold">India, RCB, Delhi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Career Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Test Stats */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Test Cricket</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Matches</span>
                                <span className="font-bold">113</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Runs</span>
                                <span className="font-bold">8,848</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Average</span>
                                <span className="font-bold">49.17</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Centuries</span>
                                <span className="font-bold">29</span>
                            </div>
                        </div>
                    </div>

                    {/* ODI Stats */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">ODI Cricket</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Matches</span>
                                <span className="font-bold">292</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Runs</span>
                                <span className="font-bold">13,848</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Average</span>
                                <span className="font-bold">58.97</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Centuries</span>
                                <span className="font-bold">50</span>
                            </div>
                        </div>
                    </div>

                    {/* T20I Stats */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">T20I Cricket</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Matches</span>
                                <span className="font-bold">115</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Runs</span>
                                <span className="font-bold">4,008</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Average</span>
                                <span className="font-bold">52.73</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Fifties</span>
                                <span className="font-bold">37</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-gray-900">Major Achievements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Records</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>Fastest to reach 13,000 ODI runs</li>
                                <li>Most centuries in ODI cricket (50)</li>
                                <li>Most runs in T20 World Cups</li>
                                <li>Most Player of the Match awards in T20Is</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Awards</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>ICC Cricketer of the Year (2017, 2018)</li>
                                <li>Rajiv Gandhi Khel Ratna Award (2018)</li>
                                <li>Padma Shri (2017)</li>
                                <li>ICC ODI Player of the Year (Multiple times)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;