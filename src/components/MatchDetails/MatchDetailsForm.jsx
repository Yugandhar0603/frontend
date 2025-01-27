import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MatchDetailsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    toss: "",
    venue: "",
    matchFormat: "T20",
    overs: 20,
    city: "",
    date: "",
    time: "",
    pitchType: "Normal",
    ballType: "White",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Match Details Submitted:", formData);
    navigate('/score');
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white shadow-2xl rounded-xl space-y-6">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Enter Match Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Toss */}
        <div className="flex items-center space-x-4">
          <i className="fas fa-trophy text-yellow-500 text-2xl flex-shrink-0"></i>
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-600 mb-2">Toss Winner</label>
            <input
              type="text"
              name="toss"
              value={formData.toss}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              placeholder="Enter the winning team"
            />
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-center space-x-4">
          <i className="fas fa-map-marker-alt text-red-500 text-2xl flex-shrink-0"></i>
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-600 mb-2">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              placeholder="Enter the venue"
            />
          </div>
        </div>

        {/* Match Format */}
        <div className="flex items-center space-x-4">
          <i className="fas fa-play-circle text-green-500 text-2xl flex-shrink-0"></i>
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-600 mb-2">Match Format</label>
            <select
              name="matchFormat"
              value={formData.matchFormat}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="T20">T20</option>
              <option value="ODI">ODI</option>
              <option value="Test">Test</option>
            </select>
          </div>
        </div>

        {/* Overs */}
        <div className="flex items-center space-x-4">
          <i className="fas fa-hourglass-half text-orange-500 text-2xl flex-shrink-0"></i>
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-600 mb-2">Overs</label>
            <input
              type="number"
              name="overs"
              value={formData.overs}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              min={1}
              max={50}
            />
          </div>
        </div>

        {/* City */}
        <div className="flex items-center space-x-4">
          <i className="fas fa-city text-blue-500 text-2xl flex-shrink-0"></i>
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-600 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              placeholder="Enter the city"
            />
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center space-x-4">
          <i className="fas fa-calendar-alt text-purple-500 text-2xl flex-shrink-0"></i>
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-600 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center space-x-4">
          <i className="fas fa-clock text-teal-500 text-2xl flex-shrink-0"></i>
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-600 mb-2">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
        </div>

        {/* Pitch Type */}
        <div className="flex items-center space-x-4">
          <i className="fas fa-golf-ball text-yellow-500 text-2xl flex-shrink-0"></i>
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-600 mb-2">Pitch Type</label>
            <select
              name="pitchType"
              value={formData.pitchType}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="Normal">Normal</option>
              <option value="Green">Green</option>
              <option value="Dusty">Dusty</option>
            </select>
          </div>
        </div>

        {/* Ball Type */}
        <div className="flex items-center space-x-4">
          <i className="fas fa-baseball-ball text-red-500 text-2xl flex-shrink-0"></i>
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-600 mb-2">Ball Type</label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ballType"
                  value="White"
                  checked={formData.ballType === "White"}
                  onChange={handleChange}
                  className="mr-2"
                />
                White
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ballType"
                  value="Red"
                  checked={formData.ballType === "Red"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Red
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 flex justify-center items-center space-x-2 text-lg"
          >
            <i className="fas fa-paper-plane"></i>
            <span>Submit Match Details</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MatchDetailsForm;
