import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import cricket1 from "../../../assets/cricket1.jpg";

function SignUp({handleClick}) {
    return (
        <div
            className="h-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url(${cricket1})`,
            }}
        >
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Sign-Up Card */}
            <div className="relative z-10 bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Sign Up for Innings
                </h2>
                <form className="space-y-4">
                    {/* Username Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div className="flex items-center border rounded-lg px-3 py-2">
                            <FaUser className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                className="flex-grow focus:outline-none"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="flex items-center border rounded-lg px-3 py-2">
                            <FaUser className="text-gray-500 mr-2" />
                            <input
                                type="text"
                                className="flex-grow focus:outline-none"
                                placeholder="Enter your name"
                            />
                        </div>
                    </div>
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="flex items-center border rounded-lg px-3 py-2">
                            <FaEnvelope className="text-gray-500 mr-2" />
                            <input
                                type="email"
                                className="flex-grow focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="flex items-center border rounded-lg px-3 py-2">
                            <FaLock className="text-gray-500 mr-2" />
                            <input
                                type="password"
                                className="flex-grow focus:outline-none"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="flex items-center border rounded-lg px-3 py-2">
                            <FaLock className="text-gray-500 mr-2" />
                            <input
                                type="password"
                                className="flex-grow focus:outline-none"
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>
                    {/* Sign-Up Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <div className="text-green-600 font-bold hover:underline cursor-pointer text-sm" onClick={handleClick}>
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
