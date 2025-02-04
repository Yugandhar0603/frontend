import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Check if user has Player role
    const hasPlayerRole = () => {
        try {
            const userData = sessionStorage.getItem('userData');
            if (!userData) return false;
            
            const parsedUserData = JSON.parse(userData);
            return parsedUserData.roles.includes('PLAYER');
        } catch (error) {
            console.error('Error checking player role:', error);
            return false;
        }
    };

    // Add function to check if link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Handle clicks outside of dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOrganizerOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    const handleNavigation = (path) => {
        setIsOrganizerOpen(false);
        navigate(path);
    };

    return (
        <nav className="bg-gray-800 p-4 w-full">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <Link 
                        to="/live-matches" 
                        className={`text-lg font-medium transition-colors duration-200 ${
                            isActive('/live-matches') 
                            ? 'text-blue-400 border-b-2 border-blue-400' 
                            : 'text-white hover:text-gray-300'
                        }`}
                    >
                        Home
                    </Link>
                    
                    {/* Organizer Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOrganizerOpen(!isOrganizerOpen)}
                            className={`text-lg font-medium transition-colors duration-200 ${
                                isActive('/create-match') || isActive('/manage-teams')
                                ? 'text-blue-400 border-b-2 border-blue-400'
                                : 'text-white hover:text-gray-300'
                            }`}
                        >
                            Organize
                        </button>
                        
                        {isOrganizerOpen && (
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <button
                                    onClick={() => handleNavigation('/create-match')}
                                    className={`block w-full text-left px-4 py-2 text-lg font-medium ${
                                        isActive('/create-match')
                                        ? 'bg-gray-100 text-blue-600'
                                        : 'text-gray-800 hover:bg-gray-100'
                                    }`}
                                >
                                    Create Match
                                </button>
                                <button
                                    onClick={() => handleNavigation('/manage-teams')}
                                    className={`block w-full text-left px-4 py-2 text-lg font-medium ${
                                        isActive('/manage-teams')
                                        ? 'bg-gray-100 text-blue-600'
                                        : 'text-gray-800 hover:bg-gray-100'
                                    }`}
                                >
                                    Manage Teams
                                </button>
                                <button
                                    onClick={() => handleNavigation('/manage-score')}
                                    className={`block w-full text-left px-4 py-2 text-lg font-medium ${
                                        isActive('/manage-score')
                                        ? 'bg-gray-100 text-blue-600'
                                        : 'text-gray-800 hover:bg-gray-100'
                                    }`}
                                >
                                    Manage Score
                                </button>
                            </div>

                        )}
                    </div>
                    <Link 
                        to="/view-match" 
                        className={`text-lg font-medium transition-colors duration-200 ${
                            isActive('/matches')
                            ? 'text-blue-400 border-b-2 border-blue-400'
                            : 'text-white hover:text-gray-300'
                        }`}
                    >
                        LIVE Matches
                    </Link>
                    
                    <Link 
                        to="/matches" 
                        className={`text-lg font-medium transition-colors duration-200 ${
                            isActive('/matches')
                            ? 'text-blue-400 border-b-2 border-blue-400'
                            : 'text-white hover:text-gray-300'
                        }`}
                    >
                        Matches
                    </Link>

                    {/* Conditionally render MyMatches link */}
                    {hasPlayerRole() && (
                        <Link 
                            to="/my-matches" 
                            className={`text-lg font-medium transition-colors duration-200 ${
                                isActive('/my-matches')
                                ? 'text-blue-400 border-b-2 border-blue-400'
                                : 'text-white hover:text-gray-300'
                            }`}
                        >
                            My Matches
                        </Link>
                    )}

                    <Link 
                        to="/profile" 
                        className={`text-lg font-medium transition-colors duration-200 ${
                            isActive('/profile') 
                            ? 'text-blue-400 border-b-2 border-blue-400' 
                            : 'text-white hover:text-gray-300'
                        }`}
                    >
                        Profile
                    </Link>
                </div>

                {/* Right side of navbar */}
                <div>
                    <button 
                        onClick={handleLogout}
                        className="text-lg font-medium text-white hover:text-gray-300 transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 