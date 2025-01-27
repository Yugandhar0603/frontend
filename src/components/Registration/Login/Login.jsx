import React from 'react';
import cricketBg from '../../../assets/cricket1.jpg';

function Login() {
    return (
        <div 
            className="min-h-screen flex items-center justify-center relative"
            style={{
                backgroundImage: `url(${cricketBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Login Form */}
            <div className="relative bg-black bg-opacity-80 p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
                    Login
                </h2>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-white">
                                Remember me
                            </label>
                        </div>
                        <div>
                            <a href="#" className="text-blue-500 hover:text-blue-400">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign in
                        </button>
                    </div>
                    <div className="text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-500 hover:text-blue-400">
                            Register here
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
