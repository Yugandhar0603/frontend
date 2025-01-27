import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectTeams = () => {
  const navigate = useNavigate();
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [team1PlayerInput, setTeam1PlayerInput] = useState("");
  const [team2PlayerInput, setTeam2PlayerInput] = useState("");
  const [error, setError] = useState("");

  const addPlayer = (team) => {
    if (team === 1 && team1PlayerInput.trim() !== "" && team1Players.length < 11) {
      setTeam1Players([...team1Players, team1PlayerInput.trim()]);
      setTeam1PlayerInput("");
      setError("");
    } else if (team === 2 && team2PlayerInput.trim() !== "" && team2Players.length < 11) {
      setTeam2Players([...team2Players, team2PlayerInput.trim()]);
      setTeam2PlayerInput("");
      setError("");
    } else if (team === 1 && team1Players.length >= 11) {
      setError("Team 1 already has 11 players.");
    } else if (team === 2 && team2Players.length >= 11) {
      setError("Team 2 already has 11 players.");
    }
  };

  const handleNext = () => {
    if (team1Players.length !== 11 || team2Players.length !== 11) {
      setError("Both teams must have exactly 11 players.");
    } else if (team1Name.trim() === "" || team2Name.trim() === "") {
      setError("Both team names must be provided.");
    } else {
      navigate('/match-details');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Teams container */}
      <div className="flex flex-col md:flex-row w-full md:space-x-6 space-y-6 md:space-y-0">
        {/* Team 1 Box */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex-1 space-y-6">
          <h2 className="text-xl font-semibold text-center">Team 1</h2>
          <input
            type="text"
            placeholder="Enter Team A Name"
            value={team1Name}
            onChange={(e) => setTeam1Name(e.target.value.trimStart())}
            className="w-full p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Player Name"
              value={team1PlayerInput}
              onChange={(e) => setTeam1PlayerInput(e.target.value)}
              className="flex-1 p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => addPlayer(1)}
              className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-base"
            >
              Add
            </button>
          </div>
          <div className="p-4 border rounded-lg min-h-[350px]">
            <h3 className="text-lg font-medium mb-3">Players:</h3>
            {team1Players.map((player, index) => (
              <div key={index} className="text-lg mb-2">
                {index + 1}. {player}
              </div>
            ))}
          </div>
        </div>

        {/* Team 2 Box */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex-1 space-y-6">
          <h2 className="text-xl font-semibold text-center">Team 2</h2>
          <input
            type="text"
            placeholder="Enter Team B Name"
            value={team2Name}
            onChange={(e) => setTeam2Name(e.target.value.trimStart())}
            className="w-full p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Player Name"
              value={team2PlayerInput}
              onChange={(e) => setTeam2PlayerInput(e.target.value)}
              className="flex-1 p-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => addPlayer(2)}
              className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-base"
            >
              Add
            </button>
          </div>
          <div className="p-4 border rounded-lg min-h-[350px]">
            <h3 className="text-lg font-medium mb-3">Players:</h3>
            {team2Players.map((player, index) => (
              <div key={index} className="text-lg mb-2">
                {index + 1}. {player}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 font-medium mt-4">{error}</p>}

      {/* Next Button */}
      <div className="mt-8">
        <button
          onClick={handleNext}
          className={`px-8 py-4 rounded-lg text-lg ${
            team1Players.length === 11 &&
            team2Players.length === 11 &&
            team1Name.trim() !== "" &&
            team2Name.trim() !== ""
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={
            team1Players.length !== 11 ||
            team2Players.length !== 11 ||
            team1Name.trim() === "" ||
            team2Name.trim() === ""
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectTeams;
