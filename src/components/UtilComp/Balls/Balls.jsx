import React, { useState } from 'react';

const ballColors = [
    'rgba(255, 255, 255, 0.9)', // Cricket white ball
    'rgba(255, 255, 255, 0.9)', // Cricket white ball
    'rgba(255, 255, 255, 0.9)', // Cricket white ball
    'rgba(255, 255, 255, 0.9)', // Cricket white ball
    'rgba(255, 255, 255, 0.9)', // Cricket white ball
    'rgba(255, 255, 255, 0.9)', // Cricket white ball
];

function Balls({ numberOfBalls, content = [], onBallClick, animateActive = false }) {
    const [currentBall, setCurrentBall] = useState(0);

    const handleBallClick = (index) => {
        if (onBallClick) {
            onBallClick(content[index], index); // Pass content and index to the callback
        }
        setCurrentBall(index); // Update the active ball
    };

    return (
        <main className="h-full w-full grid grid-cols-3 place-items-center gap-4 p-5 rounded-lg">
            {Array.from({ length: numberOfBalls }).map((_, index) => (
                <div
                    key={index}
                    onClick={() => handleBallClick(index)} // Add click handler
                    className={`h-16 w-16 rounded-full shadow-lg transition-transform transform cursor-pointer 
                        ${animateActive && index === currentBall ? 'animate-bounce' : ''}`}
                    style={{
                        
                        background: `radial-gradient(circle, ${ballColors[index]} 0%, rgba(200, 255, 200, 0.5) 70%)`,
                        border: '2px solid rgba(255, 255, 255, 0.8)',
                    }}
                >
                    {/* Optional Content */}
                    <span className="flex h-full w-full items-center justify-center text-custom-brown font-bold text-lg">
                        {content[index] || ''}
                    </span>

                    {/* Ping Animation for the active ball */}
                    {animateActive && index === currentBall && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-3 w-3 bg-green-600 rounded-full animate-ping"></div>
                        </div>
                    )}
                </div>
            ))}
        </main>
    );
}

export default Balls;
