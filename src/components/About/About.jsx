import React from 'react';

function About() {
    const aboutInfo = [
        {
            id: 1,
            category: "Tournament Features",
            details: [
                { title: "Live Scoring", description: "Real-time match updates" },
                { title: "Statistics", description: "Comprehensive player and team stats" },
                { title: "Management", description: "Complete tournament control" }
            ]
        },
        {
            id: 2,
            category: "Our Experience",
            details: [
                { title: "Tournaments", description: "50+ tournaments managed" },
                { title: "Teams", description: "200+ teams registered" },
                { title: "Matches", description: "1000+ matches completed" }
            ]
        },
        {
            id: 3,
            category: "Platform Benefits",
            details: [
                { title: "Easy Setup", description: "Quick tournament creation" },
                { title: "Mobile Ready", description: "Access from any device" },
                { title: "Support", description: "24/7 technical assistance" }
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
                About Our Platform
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutInfo.map((section) => (
                    <div key={section.id} className="bg-black rounded-lg shadow-xl overflow-hidden">
                        <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600">
                            <h2 className="text-xl font-bold text-white">{section.category}</h2>
                        </div>
                        <table className="w-full">
                            <tbody className="divide-y divide-gray-700">
                                {section.details.map((detail, index) => (
                                    <tr key={index} className="hover:bg-gray-900">
                                        <td className="px-4 py-3 text-white font-semibold w-1/3">
                                            {detail.title}
                                        </td>
                                        <td className="px-4 py-3 text-gray-300">
                                            {detail.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default About; 