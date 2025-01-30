import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../../store/authSlice';
import { motion } from 'framer-motion';
// Import all images
import image13 from '../../assets/7.png';


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8090/api/auth/validate/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('token', data.token);
                dispatch(loginSuccess({
                    user: {
                        name: data.name,
                        roles: data.allRoles,
                        token: data.token
                    }
                }));
                navigate('/live-matches');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError(error.message || 'Invalid username or password');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage: `url(${image13})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-sm w-full space-y-6 bg-black/30 backdrop-blur-sm p-6 rounded-lg shadow-2xl border border-white/20"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="mt-2 text-center text-2xl font-extrabold text-white/90">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-white/80">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="font-medium text-blue-200 hover:text-blue-100 transition-colors duration-200"
                        >
                            Register here
                        </Link>
                    </p>
                </motion.div>

                <motion.form 
                    className="mt-6 space-y-4"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {error && (
                        <div className="mb-3 p-2 bg-red-900/50 border border-red-400/50 text-red-100 rounded text-sm">
                            {error}
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="name" className="block text-white/90 font-semibold mb-1 text-sm">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-1.5 bg-black/20 border border-white/30 rounded-lg 
                                     focus:outline-none focus:border-blue-400/70 text-white placeholder-gray-400 
                                     text-sm transition-colors duration-200"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-white/90 font-semibold mb-1 text-sm">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-1.5 bg-black/20 border border-white/30 rounded-lg 
                                     focus:outline-none focus:border-blue-400/70 text-white placeholder-gray-400 
                                     text-sm transition-colors duration-200"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <button
                            type="submit"
                            className="w-full flex justify-center py-1.5 px-3 border border-transparent 
                                     rounded-md shadow-sm text-sm font-medium text-white 
                                     bg-blue-600/60 hover:bg-blue-700/70 
                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50 
                                     transition-colors duration-200"
                        >
                            Sign in
                        </button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </div>
    );
}

export default Login;
