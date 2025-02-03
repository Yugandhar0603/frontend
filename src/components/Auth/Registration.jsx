import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../../store/authSlice';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/7.png';

function Registration() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        isPlayer: false,
        isOrganizer: false
    });
    const [error, setError] = useState('');
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [nameError, setNameError] = useState('');
    const [existingUsers, setExistingUsers] = useState([]);

    // Fetch existing users when component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8090/api/auth/users');
                if (response.ok) {
                    const users = await response.json();
                    setExistingUsers(users);
                }
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchUsers();
    }, []);

    // Real-time username validation
    const validateUsername = (username) => {
        if (username.trim() === '') {
            setNameError('');
            setIsValidUsername(false);
            return;
        }

        const isNameTaken = existingUsers.some(
            user => user.name.toLowerCase() === username.toLowerCase()
        );

        if (isNameTaken) {
            setNameError('This username is already taken. Please choose a different one.');
            setIsValidUsername(false);
        } else {
            setNameError('');
            setIsValidUsername(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const allRolesId = [3];  // Fan (3) is default
            if (formData.isPlayer) allRolesId.push(1);  // Player role ID
            if (formData.isOrganizer) allRolesId.push(2);  // Organizer role ID

            const requestBody = {
                name: formData.name,
                password: formData.password,
                allRolesId: allRolesId
            };

            console.log('Sending registration request:', requestBody);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch('http://localhost:8090/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            console.log('Registration response status:', response.status);

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Registration error response:', errorData);
                throw new Error(errorData || 'Registration failed');
            }

            const data = await response.json();
            console.log('Registration success:', data);

            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
            if (err.name === 'AbortError') {
                setError('Request timed out. Please check if the server is running at http://localhost:8090');
            } else if (err.message === 'Failed to fetch') {
                setError('Unable to connect to the server. Please ensure the backend server is running at http://localhost:8090');
            } else {
                setError(err.message || 'An error occurred during registration');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Immediate validation for username
        if (name === 'name') {
            validateUsername(value);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backgroundBlendMode: 'soft-light'
            }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-black/20 backdrop-blur-sm p-8 rounded-xl border border-white/20"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white drop-shadow-lg">
                        Create new account
                    </h2>
                    <p className="mt-2 text-center text-sm text-white/90">
                        Already have an account?{' '}
                        <Link
                            to="/"
                            className="font-medium text-blue-300 hover:text-blue-200 transition-colors duration-200"
                        >
                            Sign in
                        </Link>
                    </p>
                </motion.div>

                <motion.form 
                    className="mt-8 space-y-6" 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white drop-shadow">
                                Username
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-4 py-3 bg-black/20 backdrop-blur-sm border ${
                                    nameError ? 'border-red-500' : isValidUsername ? 'border-green-400' : 'border-white/30'
                                } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200`}
                                placeholder="Enter your username"
                            />
                            {nameError && (
                                <p className="mt-1 text-sm text-red-400 font-semibold drop-shadow">
                                    {nameError}
                                </p>
                            )}
                            {isValidUsername && formData.name && (
                                <p className="mt-1 text-sm text-green-400 font-semibold drop-shadow">
                                    Username is available!
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white drop-shadow">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 bg-black/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-white/20">
                                <input
                                    id="isPlayer"
                                    name="isPlayer"
                                    type="checkbox"
                                    checked={formData.isPlayer}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-500 rounded bg-black/20"
                                />
                                <label htmlFor="isPlayer" className="ml-3 block text-sm text-white drop-shadow">
                                    I want to be a player
                                </label>
                            </div>

                            <div className="flex items-center p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-white/20">
                                <input
                                    id="isOrganizer"
                                    name="isOrganizer"
                                    type="checkbox"
                                    checked={formData.isOrganizer}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-500 rounded bg-black/20"
                                />
                                <label htmlFor="isOrganizer" className="ml-3 block text-sm text-white drop-shadow">
                                    I want to be an organizer
                                </label>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm font-semibold backdrop-blur-sm">
                            {error}
                        </div>
                    )}

                    <motion.div
                        whileHover={{ scale: isValidUsername ? 1.01 : 1 }}
                        whileTap={{ scale: isValidUsername ? 0.99 : 1 }}
                    >
                        <button
                            type="submit"
                            disabled={!isValidUsername || !formData.password}
                            className={`w-full flex justify-center py-3 px-4 border border-white/20 rounded-lg shadow-lg text-sm font-medium text-white backdrop-blur-sm
                                ${isValidUsername && formData.password
                                    ? 'bg-black/30 hover:bg-black/40'
                                    : 'bg-gray-700/30 cursor-not-allowed opacity-50'
                                } transition-all duration-200`}
                        >
                            Register
                        </button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </div>
    );
}

export default Registration; 