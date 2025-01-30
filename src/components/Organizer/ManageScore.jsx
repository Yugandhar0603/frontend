import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ManageScore.css';

const ManageScore = () => {
    const { matchId } = useParams();
    const [currentInnings, setCurrentInnings] = useState(1);
    const [battingTeam, setBattingTeam] = useState({
        name: 'Team 1',
        score: 0,
        wickets: 0,
        overs: 0,
        balls: 0,
    });

    const [currentBatsmen, setCurrentBatsmen] = useState({
        striker: {
            name: 'Rohit Sharma',
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            isStriker: true
        },
        nonStriker: {
            name: 'Virat Kohli',
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            isStriker: false
        }
    });

    const [recentBalls, setRecentBalls] = useState([]);
    const maxOvers = 20;

    // Function to check if over is complete and handle over change
    const handleOverComplete = (currentBalls) => {
        if (currentBalls === 6) {
            // Change strike at the end of over
            changeStrike();
            // Clear recent balls for new over
            setRecentBalls([]);
            return true;
        }
        return false;
    };

    const updateScore = (runs) => {
        // Update batting team's score and balls (legal delivery)
        setBattingTeam(prev => {
            const newBalls = prev.balls + 1;
            const isOverComplete = newBalls === 6;
            const newOvers = isOverComplete ? prev.overs + 1 : prev.overs;
            const remainingBalls = isOverComplete ? 0 : newBalls;
            
            return {
                ...prev,
                score: prev.score + runs,
                overs: newOvers,
                balls: remainingBalls
            };
        });

        // Update striker's stats
        setCurrentBatsmen(prev => ({
            ...prev,
            striker: {
                ...prev.striker,
                runs: prev.striker.runs + runs,
                balls: prev.striker.balls + 1,
                fours: runs === 4 ? prev.striker.fours + 1 : prev.striker.fours,
                sixes: runs === 6 ? prev.striker.sixes + 1 : prev.striker.sixes
            }
        }));

        // Update recent balls - add to end of array
        setRecentBalls(prev => {
            const updatedBalls = [...prev, runs.toString()];
            // Only clear if it's a legal delivery and we've completed 6 legal balls
            if ((battingTeam.balls + 1) === 6) {
                return [];
            }
            return updatedBalls;
        });

        // Change strike if odd runs
        if (runs % 2 !== 0) {
            changeStrike();
        }

        // Check if over is complete
        if ((battingTeam.balls + 1) === 6) {
            changeStrike(); // Change strike at end of over
            setRecentBalls([]); // Clear balls for new over
        }
    };

    const handleWicket = () => {
        setBattingTeam(prev => {
            const newBalls = prev.balls + 1;
            const isOverComplete = newBalls === 6;
            const newOvers = isOverComplete ? prev.overs + 1 : prev.overs;
            const remainingBalls = isOverComplete ? 0 : newBalls;
            
            return {
                ...prev,
                wickets: prev.wickets + 1,
                overs: newOvers,
                balls: remainingBalls
            };
        });

        setCurrentBatsmen(prev => ({
            ...prev,
            striker: {
                ...prev.striker,
                balls: prev.striker.balls + 1
            }
        }));

        // Update recent balls - add to end of array
        setRecentBalls(prev => {
            const updatedBalls = [...prev, 'W'];
            if ((battingTeam.balls + 1) === 6) {
                return [];
            }
            return updatedBalls;
        });

        // Check if over is complete
        if ((battingTeam.balls + 1) === 6) {
            changeStrike();
            setRecentBalls([]);
        }
    };

    const handleWide = () => {
        // Wide ball - only update score, not balls count
        setBattingTeam(prev => ({
            ...prev,
            score: prev.score + 1
        }));
        // Add wide to end of array
        setRecentBalls(prev => [...prev, 'Wd']);
    };

    const handleNoBall = (runs = 1) => {
        // No ball - only update score, not balls count
        setBattingTeam(prev => ({
            ...prev,
            score: prev.score + runs + 1 // +1 for the no ball
        }));

        if (runs > 0) {
            setCurrentBatsmen(prev => ({
                ...prev,
                striker: {
                    ...prev.striker,
                    runs: prev.striker.runs + runs,
                    fours: runs === 4 ? prev.striker.fours + 1 : prev.striker.fours,
                    sixes: runs === 6 ? prev.striker.sixes + 1 : prev.striker.sixes
                }
            }));
        }

        // Add no ball to end of array
        setRecentBalls(prev => [...prev, `NB+${runs}`]);
    };

    const changeStrike = () => {
        setCurrentBatsmen(prev => ({
            striker: { ...prev.nonStriker, isStriker: true },
            nonStriker: { ...prev.striker, isStriker: false }
        }));
    };

    return (
        <div className="manage-score-container">
            <div className="score-card">
                <div className="score-header">
                    <h2>Live Score - {currentInnings === 1 ? 'First' : 'Second'} Innings</h2>
                </div>

                <div className="teams-score-container">
                    <div className="team-score">
                        <div className="score-info">
                            <span className="score">{battingTeam.score}/{battingTeam.wickets}</span>
                            <span className="overs">({battingTeam.overs}.{battingTeam.balls})</span>
                        </div>
                        <div className="batsman-info">
                            <div>
                                <span className="batsman-name">{currentBatsmen.striker.name}*</span>
                                <span className="batsman-score">
                                    ({currentBatsmen.striker.runs}({currentBatsmen.striker.balls}))
                                </span>
                            </div>
                            <div>
                                <span className="batsman-name">{currentBatsmen.nonStriker.name}</span>
                                <span className="batsman-score">
                                    ({currentBatsmen.nonStriker.runs}({currentBatsmen.nonStriker.balls}))
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="recent-balls">
                    {recentBalls.map((ball, index) => (
                        <div key={index} className={`ball ${ball === 'W' ? 'wicket' : ''}`}>
                            {ball}
                        </div>
                    ))}
                </div>

                <div className="scoring-controls">
                    <div className="score-buttons">
                        {[0, 1, 2, 3, 4, 5, 6].map(runs => (
                            <button 
                                key={runs} 
                                onClick={() => updateScore(runs)}
                                className="run-btn"
                            >
                                {runs}
                            </button>
                        ))}
                    </div>

                    <div className="extra-buttons">
                        <button onClick={handleWide} className="wide">Wide</button>
                        <div className="no-ball-buttons">
                            <button onClick={() => handleNoBall()} className="no-ball">No Ball</button>
                            <button onClick={() => handleNoBall(4)} className="no-ball">NB + 4</button>
                            <button onClick={() => handleNoBall(6)} className="no-ball">NB + 6</button>
                        </div>
                        <button onClick={handleWicket} className="wicket">Wicket</button>
                        <button onClick={changeStrike} className="change-strike">Change Strike</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageScore; 