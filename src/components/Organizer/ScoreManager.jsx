import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function ScoreManager() {
    const dispatch = useDispatch();
    const [innings, setInnings] = useState(1);
    const [currentScore, setCurrentScore] = useState({
        runs: 0,
        wickets: 0,
        overs: 0,
        balls: 0,
        extras: {
            wides: 0,
            noBalls: 0,
            byes: 0,
            legByes: 0
        },
        currentBatsmen: {
            striker: { name: "Virat Kohli", runs: 0, balls: 0, fours: 0, sixes: 0 },
            nonStriker: { name: "Rohit Sharma", runs: 0, balls: 0, fours: 0, sixes: 0 }
        },
        currentBowler: { name: "Mitchell Starc", overs: 0, balls: 0, runs: 0, wickets: 0 },
        recentBalls: []
    });

    const handleRuns = (runs) => {
        const newBalls = currentScore.balls + 1;
        const newOvers = Math.floor(newBalls / 6);
        const remainingBalls = newBalls % 6;

        const updatedScore = {
            ...currentScore,
            runs: currentScore.runs + runs,
            balls: remainingBalls,
            overs: newOvers,
            recentBalls: [runs.toString(), ...currentScore.recentBalls.slice(0, 5)],
            currentBatsmen: {
                ...currentScore.currentBatsmen,
                striker: {
                    ...currentScore.currentBatsmen.striker,
                    runs: currentScore.currentBatsmen.striker.runs + runs,
                    balls: currentScore.currentBatsmen.striker.balls + 1,
                    fours: runs === 4 ? currentScore.currentBatsmen.striker.fours + 1 : currentScore.currentBatsmen.striker.fours,
                    sixes: runs === 6 ? currentScore.currentBatsmen.striker.sixes + 1 : currentScore.currentBatsmen.striker.sixes
                }
            },
            currentBowler: {
                ...currentScore.currentBowler,
                runs: currentScore.currentBowler.runs + runs,
                balls: newBalls
            }
        };

        setCurrentScore(updatedScore);
        // Here you would dispatch the update to your Redux store
        // dispatch(updateScore(updatedScore));
    };

    const handleExtra = (type) => {
        const updatedScore = {
            ...currentScore,
            runs: currentScore.runs + 1,
            extras: {
                ...currentScore.extras,
                [type]: currentScore.extras[type] + 1
            },
            recentBalls: [type === 'wides' ? 'Wd' : 'Nb', ...currentScore.recentBalls.slice(0, 5)]
        };

        setCurrentScore(updatedScore);
        // dispatch(updateScore(updatedScore));
    };

    const handleWicket = () => {
        const newBalls = currentScore.balls + 1;
        const newOvers = Math.floor(newBalls / 6);
        const remainingBalls = newBalls % 6;

        const updatedScore = {
            ...currentScore,
            wickets: currentScore.wickets + 1,
            balls: remainingBalls,
            overs: newOvers,
            recentBalls: ['W', ...currentScore.recentBalls.slice(0, 5)],
            currentBatsmen: {
                ...currentScore.currentBatsmen,
                striker: {
                    ...currentScore.currentBatsmen.striker,
                    balls: currentScore.currentBatsmen.striker.balls + 1
                }
            },
            currentBowler: {
                ...currentScore.currentBowler,
                wickets: currentScore.currentBowler.wickets + 1,
                balls: newBalls
            }
        };

        setCurrentScore(updatedScore);
        // dispatch(updateScore(updatedScore));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                {/* Score Summary */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold mb-2">
                        {currentScore.runs}/{currentScore.wickets}
                    </h2>
                    <p className="text-xl">
                        Overs: {currentScore.overs}.{currentScore.balls}
                    </p>
                </div>

                {/* Current Batsmen */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-bold mb-2">{currentScore.currentBatsmen.striker.name} *</h3>
                        <p>{currentScore.currentBatsmen.striker.runs} ({currentScore.currentBatsmen.striker.balls})</p>
                        <p>4s: {currentScore.currentBatsmen.striker.fours} | 6s: {currentScore.currentBatsmen.striker.sixes}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-bold mb-2">{currentScore.currentBatsmen.nonStriker.name}</h3>
                        <p>{currentScore.currentBatsmen.nonStriker.runs} ({currentScore.currentBatsmen.nonStriker.balls})</p>
                        <p>4s: {currentScore.currentBatsmen.nonStriker.fours} | 6s: {currentScore.currentBatsmen.nonStriker.sixes}</p>
                    </div>
                </div>

                {/* Current Bowler */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold mb-2">{currentScore.currentBowler.name}</h3>
                    <p>{currentScore.currentBowler.wickets}/{currentScore.currentBowler.runs} ({Math.floor(currentScore.currentBowler.balls/6)}.{currentScore.currentBowler.balls%6})</p>
                </div>

                {/* Recent Balls */}
                <div className="mb-8">
                    <h3 className="font-bold mb-2">Recent Balls</h3>
                    <div className="flex space-x-2">
                        {currentScore.recentBalls.map((ball, index) => (
                            <span 
                                key={index}
                                className={`w-8 h-8 flex items-center justify-center rounded-full 
                                    ${ball === 'W' ? 'bg-red-500 text-white' : 
                                    ball === '4' || ball === '6' ? 'bg-green-500 text-white' : 
                                    ball === 'Wd' || ball === 'Nb' ? 'bg-yellow-500 text-white' : 
                                    'bg-gray-200'}`}
                            >
                                {ball}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Scoring Controls */}
                <div className="space-y-4">
                    {/* Runs */}
                    <div className="grid grid-cols-4 gap-2">
                        {[0, 1, 2, 3, 4, 5, 6].map((runs) => (
                            <button
                                key={runs}
                                onClick={() => handleRuns(runs)}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                            >
                                {runs}
                            </button>
                        ))}
                    </div>

                    {/* Extras */}
                    <div className="grid grid-cols-4 gap-2">
                        <button
                            onClick={() => handleExtra('wides')}
                            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                        >
                            Wide
                        </button>
                        <button
                            onClick={() => handleExtra('noBalls')}
                            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                        >
                            No Ball
                        </button>
                        <button
                            onClick={() => handleExtra('byes')}
                            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                        >
                            Byes
                        </button>
                        <button
                            onClick={() => handleExtra('legByes')}
                            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                        >
                            Leg Byes
                        </button>
                    </div>

                    {/* Wicket */}
                    <button
                        onClick={handleWicket}
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                    >
                        Wicket
                    </button>

                    {/* Change Strike */}
                    <button
                        onClick={() => {
                            setCurrentScore(prev => ({
                                ...prev,
                                currentBatsmen: {
                                    striker: prev.currentBatsmen.nonStriker,
                                    nonStriker: prev.currentBatsmen.striker
                                }
                            }));
                        }}
                        className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                    >
                        Change Strike
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ScoreManager; 