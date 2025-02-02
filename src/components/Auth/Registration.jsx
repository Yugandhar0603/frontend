import React, { useState } from 'react';
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

            const response = await fetch('http://localhost:8090/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

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
            setError(err.message || 'An error occurred during registration');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-black/40 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white/10"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Create new account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-300">
                        Already have an account?{' '}
                        <Link
                            to="/"
                            className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
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
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                Username
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center p-4 bg-black/20 rounded-lg border border-gray-600/30 hover:border-blue-500/30 transition-colors duration-200">
                                <input
                                    id="isPlayer"
                                    name="isPlayer"
                                    type="checkbox"
                                    checked={formData.isPlayer}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-500 rounded bg-black/30"
                                />
                                <label htmlFor="isPlayer" className="ml-3 block text-sm text-gray-300">
                                    I want to be a player
                                </label>
                            </div>

                            <div className="flex items-center p-4 bg-black/20 rounded-lg border border-gray-600/30 hover:border-blue-500/30 transition-colors duration-200">
                                <input
                                    id="isOrganizer"
                                    name="isOrganizer"
                                    type="checkbox"
                                    checked={formData.isOrganizer}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-500 rounded bg-black/30"
                                />
                                <label htmlFor="isOrganizer" className="ml-3 block text-sm text-gray-300">
                                    I want to be an organizer
                                </label>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
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