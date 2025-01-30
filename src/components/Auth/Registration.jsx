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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Convert role selections to role IDs
            const roleIds = [2]; // Everyone is a fan (2)
            if (formData.isPlayer) roleIds.push(1); // Player role
            if (formData.isOrganizer) roleIds.push(3); // Organizer role

            const registrationData = {
                name: formData.name,
                password: formData.password,
                allRolesId: roleIds
            };

            const response = await fetch('http://localhost:8090/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData)
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            
            // After successful registration, redirect to login page
            navigate('/');
            
        } catch (error) {
            console.error('Error during registration:', error);
            // Handle error (show error message to user)
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
                className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-2xl"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create new account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/"
                            className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
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
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                id="isPlayer"
                                name="isPlayer"
                                type="checkbox"
                                checked={formData.isPlayer}
                                onChange={handleChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isPlayer" className="ml-2 block text-sm text-gray-900">
                                I want to be a player
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="isOrganizer"
                                name="isOrganizer"
                                type="checkbox"
                                checked={formData.isOrganizer}
                                onChange={handleChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isOrganizer" className="ml-2 block text-sm text-gray-900">
                                I want to be an organizer
                            </label>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
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