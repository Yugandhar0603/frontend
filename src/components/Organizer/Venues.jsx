import React, { useState } from 'react';

function Venues() {
    const [venues, setVenues] = useState([
        {
            id: 1,
            name: "M. Chinnaswamy Stadium",
            city: "Bangalore",
            capacity: "40,000",
            image: "https://resources.pulse.icc-cricket.com/ICC/photo/2017/01/13/5f188165-4b3b-469c-8aba-ab1b33650a20/bengaluru.jpg"
        },
        {
            id: 2,
            name: "Local Ground",
            city: "Hyderabad",
            capacity: "5,000",
            image: "https://resources.pulse.icc-cricket.com/ICC/photo/2017/01/13/5f188165-4b3b-469c-8aba-ab1b33650a20/hyderabad.jpg"
        }
    ]);

    const [newVenue, setNewVenue] = useState({
        name: '',
        city: '',
        capacity: '',
        image: ''
    });

    const handleAddVenue = () => {
        if (newVenue.name && newVenue.city) {
            setVenues([...venues, { ...newVenue, id: venues.length + 1 }]);
            setNewVenue({ name: '', city: '', capacity: '', image: '' });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Manage Venues</h2>

                {/* Add New Venue */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Add New Venue</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={newVenue.name}
                            onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Venue name"
                        />
                        <input
                            type="text"
                            value={newVenue.city}
                            onChange={(e) => setNewVenue({ ...newVenue, city: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="City"
                        />
                        <input
                            type="text"
                            value={newVenue.capacity}
                            onChange={(e) => setNewVenue({ ...newVenue, capacity: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Capacity"
                        />
                        <input
                            type="text"
                            value={newVenue.image}
                            onChange={(e) => setNewVenue({ ...newVenue, image: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Image URL"
                        />
                        <button
                            onClick={handleAddVenue}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 md:col-span-2"
                        >
                            Add Venue
                        </button>
                    </div>
                </div>

                {/* Existing Venues */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {venues.map((venue) => (
                        <div key={venue.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img 
                                src={venue.image} 
                                alt={venue.name}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x200?text=Venue+Image';
                                }}
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{venue.name}</h3>
                                <p className="text-gray-600">City: {venue.city}</p>
                                <p className="text-gray-600">Capacity: {venue.capacity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Venues; 