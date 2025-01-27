import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMatch } from '../../store/matchesSlice';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/images.jpg';

function CreateMatch() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    
    const [matchDetails, setMatchDetails] = useState({
        team1: '',
        team1ManagerId: '',
        team2: '',
        team2ManagerId: '',
        venue: '',
        date: '',
        time: ''
    });

    // Trivandrum stadiums
    const venues = [
        "Greenfield International Stadium",
        "St. Xavier's College Ground",
        "Medical College Ground",
        "Jimmy George Indoor Stadium",
        "Kerala University Stadium",
        "Central Stadium",
        "Agricultural College Ground"
    ];

    // Randomly select 5 venues
    const [selectedVenues] = useState(() => {
        const shuffled = [...venues].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
    });

    // Generate time slots
    useEffect(() => {
        if (selectedDate) {
            const slots = [
                "09:00 AM", "11:00 AM", "01:00 PM", 
                "03:00 PM", "05:00 PM", "07:00 PM", "09:00 PM"
            ];
            setAvailableSlots(slots);
        }
    }, [selectedDate]);

    const teams = [
        "Royal Challengers Bangalore",
        "Chennai Super Kings",
        "Mumbai Indians",
        "Hyderabad Hawks",
        "Delhi Capitals",
        "Bangalore Bulls"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addMatch({
            id: Date.now(),
            ...matchDetails,
            status: 'Upcoming'
        }));
        navigate('/matches');
    };

    const handleChange = (e) => {
        setMatchDetails({
            ...matchDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
        setMatchDetails(prev => ({
            ...prev,
            date: newDate,
            time: '' // Reset time when date changes
        }));
    };

    const handleTimeSelect = (selectedTime) => {
        setMatchDetails(prev => ({
            ...prev,
            time: selectedTime
        }));
    };

    const handleNext = () => {
        if (matchDetails.venue && matchDetails.date && matchDetails.time) {
            setStep(2);
        } else {
            alert('Please select venue, date and time slot');
        }
    };

    return (
        <div 
            className="min-h-screen w-full"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: 'auto'
            }}
        >
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {step === 1 ? (
                        <>
                            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
                                Create Match
                            </h2>
                            
                            <div className="max-w-2xl mx-auto bg-black rounded-lg shadow-xl overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th colSpan="2" className="px-6 py-4 bg-blue-600 text-white text-xl font-bold">
                                                Match Schedule
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {/* Venue Selection */}
                                        <tr>
                                            <td className="px-6 py-4 text-white font-semibold">Venue</td>
                                            <td className="px-6 py-4">
                                                <select
                                                    name="venue"
                                                    value={matchDetails.venue}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    required
                                                >
                                                    <option value="">Select Stadium</option>
                                                    {selectedVenues.map((venue) => (
                                                        <option key={venue} value={venue}>{venue}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>

                                        {/* Date Selection */}
                                        <tr>
                                            <td className="px-6 py-4 text-white font-semibold">Date</td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={matchDetails.date}
                                                    onChange={handleDateChange}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                                                    required
                                                />
                                            </td>
                                        </tr>

                                        {/* Time Slots */}
                                        {selectedDate && (
                                            <tr>
                                                <td className="px-6 py-4 text-white font-semibold">Time Slot</td>
                                                <td className="px-6 py-4">
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                        {availableSlots.map((slot) => (
                                                            <button
                                                                key={slot}
                                                                type="button"
                                                                onClick={() => handleTimeSelect(slot)}
                                                                className={`px-3 py-2 rounded-lg font-semibold transition-all duration-300 ${
                                                                    matchDetails.time === slot
                                                                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                                                        : 'bg-gray-700 text-white hover:bg-gray-600'
                                                                }`}
                                                            >
                                                                {slot}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <div className="px-4 py-1 bg-black border-t border-gray-700">
                                    <div className="flex justify-center">
                                        <button
                                            onClick={handleNext}
                                            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-5 py-1 rounded-md font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg text-sm"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
                                Match Details
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Team 1 Table */}
                                    <div className="bg-black rounded-lg overflow-hidden shadow-xl">
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    <th colSpan="2" className="px-6 py-4 bg-blue-600 text-white text-xl font-bold">
                                                        Team 1
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-700">
                                                <tr>
                                                    <td className="px-6 py-4 text-white font-semibold">Team Name</td>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="text"
                                                            name="team1"
                                                            value={matchDetails.team1}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            placeholder="Enter your team name"
                                                            required
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 text-white font-semibold">Manager ID</td>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="text"
                                                            name="team1ManagerId"
                                                            value={matchDetails.team1ManagerId}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            placeholder="Enter Manager ID"
                                                            required
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Team 2 Table */}
                                    <div className="bg-black rounded-lg overflow-hidden shadow-xl">
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    <th colSpan="2" className="px-6 py-4 bg-green-600 text-white text-xl font-bold">
                                                        Team 2
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-700">
                                                <tr>
                                                    <td className="px-6 py-4 text-white font-semibold">Team Name</td>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="text"
                                                            name="team2"
                                                            value={matchDetails.team2}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                            placeholder="Enter your team name"
                                                            required
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 text-white font-semibold">Manager ID</td>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="text"
                                                            name="team2ManagerId"
                                                            value={matchDetails.team2ManagerId}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                            placeholder="Enter Manager ID"
                                                            required
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateMatch;