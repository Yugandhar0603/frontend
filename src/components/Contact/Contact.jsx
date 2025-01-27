import React from 'react';
import contactBg from '../../assets/contact us.jpg';

function Contact() {
    return (
        <div 
            className="min-h-screen relative"
            style={{
                backgroundImage: `url(${contactBg})`,
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            
            {/* Content */}
            <div className="relative container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
                    Contact Us
                </h1>
                
                {/* Contact Information Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-black rounded-lg shadow-xl overflow-hidden">
                        <div className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600">
                            <h2 className="text-xl font-bold text-white">Contact Information</h2>
                        </div>
                        <table className="w-full">
                            <tbody className="divide-y divide-gray-700">
                                <tr className="hover:bg-gray-900">
                                    <td className="px-6 py-3 text-white font-semibold w-1/3">Email</td>
                                    <td className="px-6 py-3 text-gray-300">info@cricketmanagement.com</td>
                                </tr>
                                <tr className="hover:bg-gray-900">
                                    <td className="px-6 py-3 text-white font-semibold">Phone</td>
                                    <td className="px-6 py-3 text-gray-300">+91 98765 43210</td>
                                </tr>
                                <tr className="hover:bg-gray-900">
                                    <td className="px-6 py-3 text-white font-semibold">Address</td>
                                    <td className="px-6 py-3 text-gray-300">123 Stadium Road, Kerala</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Contact Form in table style */}
                    <div className="bg-black rounded-lg shadow-xl overflow-hidden">
                        <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600">
                            <h2 className="text-xl font-bold text-white">Send Message</h2>
                        </div>
                        <form className="grid grid-cols-1 gap-6 p-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-white">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact; 