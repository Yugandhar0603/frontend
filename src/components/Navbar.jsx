import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);

    // Function to close dropdown after navigation
    const handleNavigation = () => {
        setIsOrganizerOpen(false);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <Link to="/" className="text-white text-xl font-bold">
                        Home
                    </Link>
                    
                    {/* Organizer Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsOrganizerOpen(!isOrganizerOpen)}
                            className="text-white hover:text-gray-300 focus:outline-none"
                        >
                            Organizer
                        </button>
                        
                        {isOrganizerOpen && (
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <Link
                                    to="/create-match"
                                    onClick={handleNavigation}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Create Match
                                </Link>
                                <Link
                                    to="/manage-teams"
                                    onClick={handleNavigation}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Manage Teams
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    {/* Other navigation items */}
                    <Link to="/matches" className="text-white hover:text-gray-300">
                        Matches
                    </Link>
                    <Link to="/teams" className="text-white hover:text-gray-300">
                        Teams
                    </Link>
                </div>

                {/* Right side of navbar */}
                <div>
                    <Link to="/login" className="text-white hover:text-gray-300">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 