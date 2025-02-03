import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const storedUserData = sessionStorage.getItem('userData');
            console.log('Raw stored data:', storedUserData); // Debug log

            if (!storedUserData) {
                throw new Error('No user data found in session storage');
            }

            const parsedData = JSON.parse(storedUserData);
            console.log('Parsed user data:', parsedData); // Debug log

            if (!parsedData || !parsedData.name || !parsedData.roles) {
                throw new Error('Invalid user data structure');
            }

            setUserData(parsedData);
        } catch (err) {
            console.error('Detailed error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const getRoleDisplay = (role) => {
        // Handle both string roles and numeric roles
        if (typeof role === 'string') {
            switch (role) {
                case 'PLAYER': return 'Player';
                case 'FAN': return 'Fan';
                case 'ORGANIZER': return 'Organizer';
                default: return role;
            }
        }
        // Handle numeric roles if they exist
        switch (role) {
            case 1: return 'Player';
            case 2: return 'Fan';
            case 3: return 'Organizer';
            default: return 'Unknown Role';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-white text-xl font-semibold animate-pulse">
                    Loading profile...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-500/10 text-red-500 px-4 py-3 rounded-lg border border-red-500/20">
                    Error loading profile: {error}
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-yellow-500/10 text-yellow-500 px-4 py-3 rounded-lg border border-yellow-500/20">
                    No user data available. Please try logging in again.
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
            >
                <div className="bg-black rounded-xl overflow-hidden shadow-xl">
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
                        <h1 className="text-2xl font-bold text-white">User Profile</h1>
                    </div>

                    <div className="p-6">
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                    <span className="text-3xl text-white font-bold">
                                        {userData?.name?.charAt(0)?.toUpperCase() || '?'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gray-800/50 rounded-lg p-4">
                                    <h2 className="text-gray-400 text-sm mb-1">Username</h2>
                                    <p className="text-white font-semibold">{userData?.name}</p>
                                </div>

                                <div className="bg-gray-800/50 rounded-lg p-4">
                                    <h2 className="text-gray-400 text-sm mb-1">Roles</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {userData?.roles?.map((role, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400"
                                            >
                                                {getRoleDisplay(role)}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {userData?.roles?.includes('PLAYER') && (
                                    <div className="bg-gray-800/50 rounded-lg p-4">
                                        <h2 className="text-gray-400 text-sm mb-1">Player Information</h2>
                                        <p className="text-white">View your matches in the My Matches section</p>
                                    </div>
                                )}

                                {userData?.roles?.includes('ORGANIZER') && (
                                    <div className="bg-gray-800/50 rounded-lg p-4">
                                        <h2 className="text-gray-400 text-sm mb-1">Organizer Tools</h2>
                                        <p className="text-white">Access match creation and team management in the Organize section</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-green-500/10 rounded-lg p-4">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                    <span className="text-green-500 font-medium">Active Account</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default UserProfile;