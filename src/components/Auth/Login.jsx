import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8090/api/auth/validate/user', {
                name: formData.name,
                password: formData.password
            });

            console.log('Response received:', response.data);

            if (response.data && response.data.token) {
                // Store the token and roles
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('username', response.data.name);
                sessionStorage.setItem('roles', JSON.stringify(response.data.allRoles));

                // Navigate to live matches
                navigate('/live-matches');

                console.log('Login successful, navigating to live matches...');
            }
        } catch (err) {
            console.error('Error details:', {
                status: err.response?.status,
                data: err.response?.data
            });
            setError(err.response?.data?.message || 'Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
             style={{ backgroundImage: "url('/src/assets/5.png')" }}>
            <div className="w-full max-w-md p-6">
                <div className="bg-white bg-opacity-90 rounded-lg shadow-xl overflow-hidden">
                    <div className="px-6 py-4 bg-gray-800 text-white">
                        <h3 className="text-2xl font-bold text-center">Login</h3>
                    </div>
                    <div className="p-6">
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
