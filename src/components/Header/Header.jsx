import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { FaUser, FaCaretDown, FaClipboardList } from 'react-icons/fa';
import { MdSportsCricket } from 'react-icons/md';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const matchCount = useSelector((state) => state.matches.count);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showOrganizerMenu, setShowOrganizerMenu] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <header className='w-full h-max hidden sm:flex box-border top-0 left-0 right-0 py-5 shadow-md bg-black z-10'>
            <nav className='h-full w-full flex text-white font-semibold items-center justify-between px-6'>
                <div 
                    className='h-full cursor-pointer transition-transform duration-300 hover:scale-110 flex items-center'
                    onClick={() => navigate('/')}
                >
                    <MdSportsCricket className="text-2xl mr-2" />
                    <span className="text-2xl font-bold">InningsNow</span>
                </div>

                <ul className='flex items-center space-x-8 h-full cursor-pointer'>
                    <li 
                        className='relative group px-4 py-2'
                        onClick={() => navigate('/')}
                    >
                        <span className='text-white group-hover:text-green-400 transition-colors duration-300'>
                            Home
                        </span>
                    </li>

                    {isAuthenticated && (
                        <>
                            <li 
                                className='relative group px-4 py-2'
                                onClick={() => navigate('/matches')}
                            >
                                <div className="flex items-center">
                                    <span className='text-white group-hover:text-green-400 transition-colors duration-300 mr-2'>
                                        Matches
                                    </span>
                                    {matchCount > 0 && (
                                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {matchCount}
                                        </span>
                                    )}
                                </div>
                            </li>

                            <li className='relative group'>
                                <div 
                                    className='flex items-center space-x-2 px-4 py-2 cursor-pointer'
                                    onClick={() => setShowOrganizerMenu(!showOrganizerMenu)}
                                >
                                    <FaClipboardList className='text-white group-hover:text-green-400' />
                                    <span className='text-white group-hover:text-green-400'>
                                        Organizer
                                    </span>
                                    <FaCaretDown className='text-white group-hover:text-green-400' />
                                </div>
                                
                                {showOrganizerMenu && (
                                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                                        <div 
                                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                                            onClick={() => {
                                                navigate('/create-match');
                                                setShowOrganizerMenu(false);
                                            }}
                                        >
                                            Create Match
                                        </div>
                                        <div 
                                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                                            onClick={() => {
                                                navigate('/manage-teams');
                                                setShowOrganizerMenu(false);
                                            }}
                                        >
                                            Manage Teams
                                        </div>
                                        <div 
                                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                                            onClick={() => {
                                                navigate('/venues');
                                                setShowOrganizerMenu(false);
                                            }}
                                        >
                                            Venues
                                        </div>
                                    </div>
                                )}
                            </li>
                        </>
                    )}

                    <li 
                        className='relative group px-4 py-2'
                        onClick={() => navigate('/about')}
                    >
                        <span className='text-white group-hover:text-green-400 transition-colors duration-300'>
                            About
                        </span>
                    </li>

                    <li 
                        className='relative group px-4 py-2'
                        onClick={() => navigate('/contact')}
                    >
                        <span className='text-white group-hover:text-green-400 transition-colors duration-300'>
                            Contact
                        </span>
                    </li>

                    {isAuthenticated && (
                        <li className='relative group'>
                            <div 
                                className='flex items-center space-x-2 px-4 py-2 cursor-pointer'
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                            >
                                <FaUser className='text-white group-hover:text-green-400' />
                                <span className='text-white group-hover:text-green-400'>
                                    {user?.email || 'Profile'}
                                </span>
                                <FaCaretDown className='text-white group-hover:text-green-400' />
                            </div>
                            
                            {showProfileMenu && (
                                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                                    <div 
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                                        onClick={() => {
                                            navigate('/profile');
                                            setShowProfileMenu(false);
                                        }}
                                    >
                                        View Profile
                                    </div>
                                    <div 
                                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                                        onClick={() => {
                                            handleLogout();
                                            setShowProfileMenu(false);
                                        }}
                                    >
                                        Logout
                                    </div>
                                </div>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;