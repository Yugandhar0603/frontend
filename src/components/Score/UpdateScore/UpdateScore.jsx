import React from 'react';
import Balls from '../../UtilComp/Balls/Balls';
import RippleButton from '../../UtilComp/RippleButton/RippleButton';

function UpdateScore() {

    //have access to content and index of ball
    const handleBallClick = (content, index) => {
        console.log(`Ball ${index + 1} clicked with content: ${content}`);
    };

    const handleButtonSubmit = () => {
        
    }

    return (
        <main className="w-full h-full flex flex-col bg-white p-4 justify-center">
            {/* Balls display section */}
            {/* <section className="w-full h-max bg-green-300 shadow-md rounded-lg flex items-center justify-center mb-4">
                <Balls
                    numberOfBalls={6}
                    animateActive={true}
                    onBallClick={handleBallClick}
                />
            </section> */}

            {/* Center Ripple Button section */}
            {/* <section className="w-full h-[10%] flex items-center justify-center">
                <RippleButton buttonText="Update Score" onButtonClick={handleButtonSubmit}/>
            </section> */}

            {/* Input Section */}
            <section className="w-full h-max shadow-md rounded-lg flex items-center justify-center">
                <Balls
                    numberOfBalls={8}
                    content={[1, 2, 3, 4, 6, 'W', 'Wd', 'NB']}
                    animateActive={false}
                    onBallClick={handleBallClick}
                />
            </section>
        </main>
    );
}

export default UpdateScore;
