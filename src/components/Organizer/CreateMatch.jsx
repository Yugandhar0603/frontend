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
    const [stadiums, setStadiums] = useState([]);
    const [matchDetails, setMatchDetails] = useState({
        team1: '',
        team1ManagerId: '',
        team2: '',
        team2ManagerId: '',
        venue: '',
        stadiumId: '',
        date: '',
        time: ''
    });
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [userId, setUserId] = useState('');

    // Fetch stadiums on component mount
    useEffect(() => {
        const fetchStadiums = async () => {
            try {
                const response = await fetch('http://localhost:1718/api/stadiums');
                const data = await response.json();
                setStadiums(data);
            } catch (error) {
                console.error('Error fetching stadiums:', error);
            }
        };
        fetchStadiums();
    }, []);

    // Modified useEffect for time slots
    useEffect(() => {
        const fetchTimeSlots = async () => {
            if (selectedDate && matchDetails.stadiumId) {
                try {
                    const formattedDate = selectedDate.split('T')[0];
                    const url = `http://localhost:8089/stadium-slot/stadiumslot/${matchDetails.stadiumId}/${formattedDate}`;
                    console.log('Fetching slots with URL:', url);

                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });
                
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    console.log('Slots response:', data);
                    setAvailableSlots(data.slots || []);
                } catch (error) {
                    console.error('Error fetching time slots:', error);
                    setAvailableSlots([]);
                }
            }
        };
        fetchTimeSlots();
    }, [selectedDate, matchDetails.stadiumId]);

    const formatTime = (timeString) => {
        // Convert 24-hour time string to 12-hour format
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes), 0);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

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
        if (e.target.name === 'venue') {
            const stadium = stadiums.find(s => s.stadiumName === e.target.value);
            setMatchDetails({
                ...matchDetails,
                venue: e.target.value,
                stadiumId: stadium ? stadium.stadiumId : ''
            });
        } else {
            setMatchDetails({
                ...matchDetails,
                [e.target.name]: e.target.value
            });
        }
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

    // Modified handleTimeSelect to store the entire slot data
    const handleTimeSelect = (timeRange, slotData) => {
        console.log('Selected slot data:', slotData);
        setMatchDetails({
            ...matchDetails,
            time: timeRange
        });
        setSelectedSlotId(slotData.stadiumSlotId);
    };

    // Modified createBooking to use the selected slot ID
    const createBooking = async () => {
        try {
            const bookingData = {
                id: 1,
                stadiumSlotId: selectedSlotId,
                userId: parseInt(userId),
                bookingDate: selectedDate.split('T')[0],
                status: "PENDING"
            };

            console.log('Sending booking data:', bookingData);

            const response = await fetch('http://localhost:1721/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Booking created successfully:', data);
            return true;
        } catch (error) {
            console.error('Error creating booking:', error);
            alert(`Failed to create booking: ${error.message}`);
            return false;
        }
    };

    const handleNext = async () => {
        if (!selectedSlotId) {
            alert('Please select a time slot');
            return;
        }

        if (!userId) {
            alert('Please enter a User ID');
            return;
        }

        const bookingSuccess = await createBooking();
        if (!bookingSuccess) {
            alert('Failed to create booking. Please try again.');
            return;
        }

        setStep(2);
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
                                                    {stadiums.map((stadium) => (
                                                        <option key={stadium.stadiumId} value={stadium.stadiumName}>
                                                            {stadium.stadiumName}
                                                        </option>
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

                                        {/* User ID input field */}
                                        <tr>
                                            <td className="px-6 py-4 text-white font-semibold">User ID</td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="number"
                                                    value={userId}
                                                    onChange={(e) => setUserId(e.target.value)}
                                                    className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Enter User ID"
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
                                                        {availableSlots.map((slotData) => {
                                                            const startTime = formatTime(slotData.slot.startTime);
                                                            const endTime = formatTime(slotData.slot.endTime);
                                                            const timeRange = `${startTime} - ${endTime}`;
                                                            
                                                            return (
                                                                <button
                                                                    key={slotData.stadiumSlotId}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        console.log('Clicking slot:', slotData);
                                                                        handleTimeSelect(timeRange, slotData);
                                                                    }}
                                                                    className={`px-3 py-2 rounded-lg font-semibold transition-all duration-300 ${
                                                                        matchDetails.time === timeRange
                                                                            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                                                            : 'bg-gray-700 text-white hover:bg-gray-600'
                                                                    }`}
                                                                >
                                                                    {timeRange}
                                                                </button>
                                                            );
                                                        })}
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