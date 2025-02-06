import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ViewMatch.css';

const ViewMatch = () => {
    const [matchDetails, setMatchDetails] = useState(null);
    const { matchId } = useParams();

    useEffect(() => {
        // Function to fetch match details
        const fetchMatchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:1729/bookings/wholescore/401`);
                if (!response.ok) {
                    throw new Error('Failed to fetch match details');
                }
                const data = await response.json();
                setMatchDetails(data);
            } catch (error) {
                console.error('Error fetching match details:', error);
            }
        };

        // Initial fetch
        fetchMatchDetails();

        // Set up interval for periodic fetching
        const intervalId = setInterval(fetchMatchDetails, 3000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [matchId]);

    if (!matchDetails) {
        return <div className="loading">Loading match details...</div>;
    }

    const firstInnings = matchDetails.scores[0];
    const secondInnings = matchDetails.scores[1];
    const team1 = matchDetails.teams[0];
    const team2 = matchDetails.teams[1];

    return (
        <div className="view-match-container">
            <div className="match-header">
                <h2>Match Details</h2>
                <p className="match-date">Date: {matchDetails.date}</p>
                <p className="teams">{team1.name} vs {team2.name}</p>
            </div>

            <div className="innings-container">
                <div className="innings first-innings">
                    <h3>First Innings</h3>
                    <div className="team-details">
                        <h4>{team1.name}</h4>
                        <p className="score">
                            {firstInnings.strikerRuns}/{firstInnings.gameWickets}
                        </p>
                        <p className="overs">
                            Overs: {Math.floor(firstInnings.gameBallNo/6)}.{firstInnings.gameBallNo % 6}/{firstInnings.gameTotalOvers}
                        </p>
                        <p>Wide Balls: {firstInnings.wideBall}</p>
                    </div>
                    <div className="players-details">
                        <p>Striker: Player {firstInnings.strikerPlayerId}</p>
                        <p>Non-Striker: Player {firstInnings.nonStrikerPlayerId}</p>
                        <p>Bowler: Player {firstInnings.bowlerId}</p>
                    </div>
                </div>

                {matchDetails.gameSwitch && (
                    <div className="innings second-innings">
                        <h3>Second Innings</h3>
                        <div className="team-details">
                            <h4>{team2.name}</h4>
                            <p className="score">
                                {secondInnings.strikerRuns}/{secondInnings.gameWickets}
                            </p>
                            <p className="overs">
                                Overs: {Math.floor(secondInnings.gameBallNo/6)}.{secondInnings.gameBallNo % 6}/{secondInnings.gameTotalOvers}
                            </p>
                            <p>Wide Balls: {secondInnings.wideBall}</p>
                        </div>
                        <div className="players-details">
                            <p>Striker: Player {secondInnings.strikerPlayerId}</p>
                            <p>Non-Striker: Player {secondInnings.nonStrikerPlayerId}</p>
                            <p>Bowler: Player {secondInnings.bowlerId}</p>
                        </div>
                    </div>
                )}
            </div>

            {matchDetails.gameWinTeam !== 0 && (
                <div className="match-result">
                    <h3>Match Result</h3>
                    <p>Winner: {matchDetails.gameWinTeam === team1.id ? team1.name : team2.name}</p>
                </div>
            )}
        </div>
    );
};

export default ViewMatch; 