import React, { useState, useEffect } from 'react';
import './ManageScore.css';

const ManageScore = () => {
    const [matchDetails, setMatchDetails] = useState(null);
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const [setupData, setSetupData] = useState({
        totalOvers: 20,
        firstInnings: {
            striker: '',
            nonStriker: '',
            bowler: ''
        },
        secondInnings: {
            striker: '',
            nonStriker: '',
            bowler: ''
        }
    });
    const [currentInnings, setCurrentInnings] = useState(0);
    const [recentBalls, setRecentBalls] = useState([]);
    const [currentScore, setCurrentScore] = useState({
        runs: 0,
        wickets: 0,
        overs: 0,
        balls: 0,
        striker: null,
        nonStriker: null,
        bowler: null
    });
    const [currentInningsData, setCurrentInningsData] = useState({
        battingTeam: null,
        bowlingTeam: null,
        striker: '',
        nonStriker: '',
        bowler: '',
        score: 0,
        wickets: 0,
        overs: 0,
        balls: 0,
        recentBalls: [],
        totalOvers: 0
    });

    // Add new state for ball details
    const [ballDetails, setBallDetails] = useState({
        runs: 0,
        isWide: false,
        isNoBall: false,
        isWicket: false
    });

    // Add state for tracking legal deliveries in current over
    const [legalDeliveriesInOver, setLegalDeliveriesInOver] = useState(0);

    // Add new state to track current over's balls
    const [currentOverBalls, setCurrentOverBalls] = useState([]);

    useEffect(() => {
        fetchMatchDetails();
    }, []);

    const fetchMatchDetails = async () => {
        try {
            const response = await fetch('http://localhost:1729/bookings/wholescore/401');
            const data = await response.json();
            setMatchDetails(data);
        } catch (error) {
            console.error('Error fetching match details:', error);
            alert('Failed to load match details');
        }
    };

    const handleSetupSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Prepare the request payload using the existing matchDetails and setupData
            const updatePayload = {
                ...matchDetails,
                scores: [
                    {
                        ...matchDetails.scores[0],
                        gameTotalOvers: setupData.totalOvers,
                        strikerPlayerId: parseInt(setupData.firstInnings.striker),
                        nonStrikerPlayerId: parseInt(setupData.firstInnings.nonStriker),
                        bowlerId: parseInt(setupData.firstInnings.bowler)
                    },
                    {
                        ...matchDetails.scores[1],
                        gameTotalOvers: setupData.totalOvers,
                        strikerPlayerId: parseInt(setupData.secondInnings.striker),
                        nonStrikerPlayerId: parseInt(setupData.secondInnings.nonStriker),
                        bowlerId: parseInt(setupData.secondInnings.bowler)
                    }
                ]
            };

            // Make the PUT request
            const response = await fetch('http://localhost:1729/bookings/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatePayload)
            });

            if (!response.ok) {
                throw new Error('Failed to update match details');
            }

            // If the request is successful, proceed with setting up the innings
            setCurrentInningsData({
                battingTeam: matchDetails.teams[0],
                bowlingTeam: matchDetails.teams[1],
                striker: setupData.firstInnings.striker,
                nonStriker: setupData.firstInnings.nonStriker,
                bowler: setupData.firstInnings.bowler,
                score: 0,
                wickets: 0,
                overs: 0,
                balls: 0,
                recentBalls: [],
                totalOvers: setupData.totalOvers
            });
            
            setIsSetupComplete(true);

        } catch (error) {
            console.error('Error updating match details:', error);
            alert('Failed to update match details. Please try again.');
        }
    };

    // Modified function to handle ball details
    const handleBallDetails = async () => {
        const { runs, isWide, isNoBall, isWicket } = ballDetails;
        const isLegalDelivery = !isWide && !isNoBall;
        
        try {
            // First update the local state as before
            setCurrentInningsData(prev => {
                let newScore = prev.score;
                let newBalls = prev.balls;
                let newOvers = prev.overs;
                let newLegalDeliveries = legalDeliveriesInOver;
                let newStriker = prev.striker;
                let newNonStriker = prev.nonStriker;
                let ballNotation = '';

                // Handle extras
                if (isWide || isNoBall) {
                    newScore += 1; // Add 1 for the extra
                    ballNotation = isWide ? 'Wd' : 'Nb';
                }

                // Add runs (possible in both legal and no-ball cases, not in wide)
                if (!isWide && runs > 0) {
                    newScore += runs;
                    ballNotation = runs.toString();
                    if (isNoBall) {
                        ballNotation = `${runs}Nb`;
                    }
                }

                // Handle wicket
                if (isWicket && !isWide && !isNoBall) {
                    ballNotation = 'W';
                }

                // Always show 0 runs
                if (!isWide && runs === 0 && !isWicket && !isNoBall) {
                    ballNotation = '0';
                }

                // Update legal deliveries and overs
                if (isLegalDelivery) {
                    newLegalDeliveries++;
                    if (newLegalDeliveries === 6) {
                        newOvers = prev.overs + 1;
                        newLegalDeliveries = 0;
                        // Change strike at over end
                        [newStriker, newNonStriker] = [newNonStriker, newStriker];
                    }
                }
                newBalls = isLegalDelivery ? newLegalDeliveries : prev.balls;

                // Update current over balls
                let newCurrentOverBalls;
                
                // If this is the first legal delivery after an over completion
                if (legalDeliveriesInOver === 0 && isLegalDelivery) {
                    newCurrentOverBalls = [ballNotation];
                } else {
                    newCurrentOverBalls = [...currentOverBalls, ballNotation];
                }

                setCurrentOverBalls(newCurrentOverBalls);
                setLegalDeliveriesInOver(newLegalDeliveries);

                return {
                    ...prev,
                    score: newScore,
                    balls: newBalls,
                    overs: newOvers,
                    striker: newStriker,
                    nonStriker: newNonStriker,
                    recentBalls: newCurrentOverBalls,
                    wickets: isWicket ? prev.wickets + 1 : prev.wickets
                };
            });

            // Get current innings score
            const currentScore = matchDetails.scores[currentInnings];

            // Create updated score with the correct scoreId
            const updatedScore = {
                ...currentScore,
                strikerRuns: currentScore.strikerRuns + (!isWide ? runs : 0),
                wideBall: isWide ? currentScore.wideBall + 1 : currentScore.wideBall,
                gameWickets: isWicket ? currentScore.gameWickets + 1 : currentScore.gameWickets,
                gameBallNo: isLegalDelivery ? currentScore.gameBallNo + 1 : currentScore.gameBallNo,
                strikerPlayerId: parseInt(currentInningsData.striker),
                nonStrikerPlayerId: parseInt(currentInningsData.nonStriker),
                bowlerId: parseInt(currentInningsData.bowler)
            };

            // Prepare the update payload
            // Keep both scores, but update only the relevant one
            const updatedScores = [
                currentInnings === 0 ? updatedScore : matchDetails.scores[0],
                currentInnings === 1 ? updatedScore : matchDetails.scores[1]
            ];

            const updatePayload = {
                ...matchDetails,
                gameSwitch: currentInnings === 1, // true for second innings, false for first innings
                scores: updatedScores
            };

            // Make the PUT request
            const response = await fetch('http://localhost:1729/bookings/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatePayload)
            });

            if (!response.ok) {
                throw new Error('Failed to update match details');
            }

            const responseData = await response.json();
            console.log('PUT Request Successful:', responseData);

            // Update the local matchDetails state with the new scores
            setMatchDetails(prev => ({
                ...prev,
                scores: updatedScores
            }));

            // Reset ball details
            setBallDetails({
                runs: 0,
                isWide: false,
                isNoBall: false,
                isWicket: false
            });

        } catch (error) {
            console.error('Error updating match details:', error);
            alert('Failed to update match details. Please try again.');
        }
    };

    // Add this function to handle innings change
    const handleInningsChange = () => {
        setCurrentInnings(1); // Switch to second innings
        setCurrentInningsData({
            battingTeam: currentInningsData.bowlingTeam,
            bowlingTeam: currentInningsData.battingTeam,
            striker: setupData.secondInnings.striker,
            nonStriker: setupData.secondInnings.nonStriker,
            bowler: setupData.secondInnings.bowler,
            score: 0,
            wickets: 0,
            overs: 0,
            balls: 0,
            recentBalls: [],
            totalOvers: currentInningsData.totalOvers
        });
        setLegalDeliveriesInOver(0);
        setCurrentOverBalls([]);
    };

    if (!matchDetails) {
        return <div>Loading match details...</div>;
    }

    // If setup is not complete, show setup form
    if (!isSetupComplete) {
        const battingTeam = matchDetails.teams[0]; // Team 1 bats first
        const bowlingTeam = matchDetails.teams[1];

        return (
            <div className="setup-container">
                <h2 className="setup-title">Match Setup</h2>
                <form onSubmit={handleSetupSubmit} className="setup-form">
                    <div className="setup-section">
                        <h3>First Innings Setup</h3>
                        <div className="form-group">
                            <label>Number of Overs:</label>
                            <input
                                type="number"
                                value={setupData.totalOvers}
                                onChange={(e) => setSetupData({
                                    ...setupData,
                                    totalOvers: parseInt(e.target.value)
                                })}
                                min="1"
                                max="50"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Select Striker ({battingTeam.name}):</label>
                            <select
                                value={setupData.firstInnings.striker}
                                onChange={(e) => setSetupData({
                                    ...setupData,
                                    firstInnings: {
                                        ...setupData.firstInnings,
                                        striker: e.target.value
                                    }
                                })}
                                required
                            >
                                <option value="">Select Striker</option>
                                {battingTeam.teamPlayers.map(player => (
                                    <option key={player.id} value={player.playerId}>
                                        Player {player.playerId}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Select Non-Striker ({battingTeam.name}):</label>
                            <select
                                value={setupData.firstInnings.nonStriker}
                                onChange={(e) => setSetupData({
                                    ...setupData,
                                    firstInnings: {
                                        ...setupData.firstInnings,
                                        nonStriker: e.target.value
                                    }
                                })}
                                required
                            >
                                <option value="">Select Non-Striker</option>
                                {battingTeam.teamPlayers.map(player => (
                                    <option key={player.id} value={player.playerId}>
                                        Player {player.playerId}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Select Bowler ({bowlingTeam.name}):</label>
                            <select
                                value={setupData.firstInnings.bowler}
                                onChange={(e) => setSetupData({
                                    ...setupData,
                                    firstInnings: {
                                        ...setupData.firstInnings,
                                        bowler: e.target.value
                                    }
                                })}
                                required
                            >
                                <option value="">Select Bowler</option>
                                {bowlingTeam.teamPlayers.map(player => (
                                    <option key={player.id} value={player.playerId}>
                                        Player {player.playerId}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="setup-section">
                        <h3>Second Innings Setup</h3>
                        <div className="form-group">
                            <label>Select Striker ({bowlingTeam.name}):</label>
                            <select
                                value={setupData.secondInnings.striker}
                                onChange={(e) => setSetupData({
                                    ...setupData,
                                    secondInnings: {
                                        ...setupData.secondInnings,
                                        striker: e.target.value
                                    }
                                })}
                                required
                            >
                                <option value="">Select Striker</option>
                                {bowlingTeam.teamPlayers.map(player => (
                                    <option key={player.id} value={player.playerId}>
                                        Player {player.playerId}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Select Non-Striker ({bowlingTeam.name}):</label>
                            <select
                                value={setupData.secondInnings.nonStriker}
                                onChange={(e) => setSetupData({
                                    ...setupData,
                                    secondInnings: {
                                        ...setupData.secondInnings,
                                        nonStriker: e.target.value
                                    }
                                })}
                                required
                            >
                                <option value="">Select Non-Striker</option>
                                {bowlingTeam.teamPlayers.map(player => (
                                    <option key={player.id} value={player.playerId}>
                                        Player {player.playerId}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Select Bowler ({battingTeam.name}):</label>
                            <select
                                value={setupData.secondInnings.bowler}
                                onChange={(e) => setSetupData({
                                    ...setupData,
                                    secondInnings: {
                                        ...setupData.secondInnings,
                                        bowler: e.target.value
                                    }
                                })}
                                required
                            >
                                <option value="">Select Bowler</option>
                                {battingTeam.teamPlayers.map(player => (
                                    <option key={player.id} value={player.playerId}>
                                        Player {player.playerId}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="setup-submit">
                        Start Match
                    </button>
                </form>
            </div>
        );
    }

    // Scoring dashboard render after setup
    if (isSetupComplete) {
        return (
            <div className="manage-score-container">
                <div className="match-header">
                    <h2>Match Date: {matchDetails.date}</h2>
                    <h3>{currentInningsData.battingTeam.name} vs {currentInningsData.bowlingTeam.name}</h3>
                    <p className="innings-indicator">First Innings</p>
                </div>

                <div className="score-display">
                    <div className="current-score">
                        <h3>{currentInningsData.battingTeam.name}</h3>
                        <p className="score">{currentInningsData.score}/{currentInningsData.wickets}</p>
                        <p className="overs">
                            ({currentInningsData.overs}.{currentInningsData.balls})
                            <span className="total-overs"> / {currentInningsData.totalOvers}.0</span>
                        </p>
                    </div>

                    <div className="batting-details">
                        <h4>Batting</h4>
                        <div className="player-row">
                            <span>
                                Striker: Player {currentInningsData.striker} *
                            </span>
                            <span>
                                Non-Striker: Player {currentInningsData.nonStriker}
                            </span>
                        </div>
                    </div>

                    <div className="bowling-details">
                        <h4>Bowling</h4>
                        <span>Current Bowler: Player {currentInningsData.bowler}</span>
                    </div>

                    <div className="recent-balls">
                        <h4>Recent Deliveries (This Over)</h4>
                        <div className="balls-container">
                            {currentOverBalls.map((ball, index) => (
                                <span key={index} className={`ball ${ball === 'W' ? 'wicket' : ''}`}>
                                    {ball}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="scoring-controls">
                    <div className="ball-details">
                        <h4>Ball Details</h4>
                        <div className="runs-input">
                            <label>Runs scored:</label>
                            <select 
                                value={ballDetails.runs}
                                onChange={(e) => setBallDetails(prev => ({
                                    ...prev,
                                    runs: parseInt(e.target.value)
                                }))}
                            >
                                {[0, 1, 2, 3, 4, 6].map(run => (
                                    <option key={run} value={run}>{run}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="ball-type-checkboxes">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ballDetails.isWide}
                                    onChange={(e) => setBallDetails(prev => ({
                                        ...prev,
                                        isWide: e.target.checked,
                                        isNoBall: false, // Can't be both wide and no-ball
                                        runs: e.target.checked ? 0 : prev.runs // No runs on wide
                                    }))}
                                />
                                Wide
                            </label>
                            
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ballDetails.isNoBall}
                                    onChange={(e) => setBallDetails(prev => ({
                                        ...prev,
                                        isNoBall: e.target.checked,
                                        isWide: false // Can't be both wide and no-ball
                                    }))}
                                />
                                No Ball
                            </label>
                            
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ballDetails.isWicket}
                                    onChange={(e) => setBallDetails(prev => ({
                                        ...prev,
                                        isWicket: e.target.checked,
                                        isWide: false, // Can't be wicket on wide
                                        runs: e.target.checked ? 0 : prev.runs // No runs on wicket
                                    }))}
                                />
                                Wicket
                            </label>
                        </div>
                        
                        <button 
                            onClick={handleBallDetails}
                            className="record-ball-button"
                            disabled={currentInningsData.wickets >= 10 || 
                                     (currentInningsData.overs >= currentInningsData.totalOvers && 
                                      legalDeliveriesInOver === 0)}
                        >
                            Record Ball
                        </button>
                    </div>
                </div>

                {(currentInningsData.overs >= currentInningsData.totalOvers || 
                  currentInningsData.wickets >= 10) && currentInnings === 0 && (
                    <div className="end-innings">
                        <button
                            onClick={handleInningsChange}
                            className="end-innings-button"
                        >
                            End Innings
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // Rest of your existing ManageScore component code for the scoring interface
    return (
        <div className="manage-score-container">
            <div className="match-header">
                <h2>Match Date: {matchDetails.date}</h2>
                <h3>{battingTeam.name} vs {bowlingTeam.name}</h3>
            </div>

            <div className="score-display">
                <div className="current-score">
                    <h3>{battingTeam.name}</h3>
                    <p className="score">{currentScore.runs}/{currentScore.wickets}</p>
                    <p className="overs">({currentScore.overs}.{currentScore.balls})</p>
                    <p>Target: {currentInnings === 1 ? matchDetails.scores[0].strikerRuns + 1 : '-'}</p>
                </div>

                <div className="batting-details">
                    <h4>Batting</h4>
                    <div className="player-row">
                        <span>Striker: Player {currentScore.striker} *</span>
                        <span>Non-Striker: Player {currentScore.nonStriker}</span>
                    </div>
                </div>

                <div className="bowling-details">
                    <h4>Bowling</h4>
                    <span>Current Bowler: Player {currentScore.bowler}</span>
                </div>

                <div className="recent-balls">
                    <h4>Recent Deliveries</h4>
                    <div className="balls-container">
                        {recentBalls.slice(-6).map((ball, index) => (
                            <span key={index} className={`ball ${ball === 'W' ? 'wicket' : ''}`}>
                                {ball}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="score-buttons">
                {[0, 1, 2, 3, 4, 6].map(runs => (
                    <button 
                        key={runs} 
                        onClick={() => {
                            setCurrentScore(prev => ({
                                ...prev,
                                runs: prev.runs + runs,
                                balls: (prev.balls + 1) % 6,
                                overs: prev.balls === 5 ? prev.overs + 1 : prev.overs
                            }));
                            setRecentBalls(prev => [...prev, runs.toString()]);
                        }}
                        className="run-button"
                    >
                        {runs}
                    </button>
                ))}
                <button 
                    onClick={() => {
                        setCurrentScore(prev => ({
                            ...prev,
                            wickets: prev.wickets + 1,
                            balls: (prev.balls + 1) % 6,
                            overs: prev.balls === 5 ? prev.overs + 1 : prev.overs
                        }));
                        setRecentBalls(prev => [...prev, 'W']);
                    }}
                    className="wicket-button"
                >
                    W
                </button>
                <button 
                    onClick={() => {
                        setCurrentScore(prev => ({
                            ...prev,
                            runs: prev.runs + 1
                        }));
                        setRecentBalls(prev => [...prev, 'Wd']);
                    }}
                    className="extra-button"
                >
                    Wide
                </button>
                <button 
                    onClick={() => {
                        setCurrentScore(prev => ({
                            ...prev,
                            runs: prev.runs + 1
                        }));
                        setRecentBalls(prev => [...prev, 'Nb']);
                    }}
                    className="extra-button"
                >
                    No Ball
                </button>
            </div>
        </div>
    );
};

export default ManageScore; 