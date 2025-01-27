import React, { useState } from 'react';
import Header from '../Header/Header';
import UpdateScore from './UpdateScore/UpdateScore';
import LiveScore from './LiveScore/LiveScore';
import Scorecard from './ScoreCard/Scorecard';

function Score() {
    const [isLive, setIsLive] = useState(true);

    // Switching between live and scorecard
    const handleSwitch = (e) => {
        setIsLive(!isLive);
    };

    return (
        <main 
            className='w-screen h-max md:h-screen bg-gradient-to-b from-green-200 to-green-400 flex items-center justify-center'
        >
            <section 
                className='flex flex-col md:flex-row w-full h-full'
            >

                {/* Left section (Update Score) */}
                <article 
                    className='flex justify-center md:justify-center md:w-1/3 w-full'
                >
                    <UpdateScore />
                </article>
                {/* Update score ends here */}

                {/* Right section (LiveScore and Scorecard) */}
                <article 
                    className='md:w-2/3 w-full overflow-y-auto flex flex-col'
                >

                    {/* Switch section starts here*/}
                    <div className='w-full h-max'>
                        <ul 
                            className='flex items-center py-3 px-4 text-heading text-2xl'
                        >
                            <li
                                className={`flex flex-1 ${isLive ? 'bg-custom-brown text-white' : 'text-custom-brown'} py-1 px-4 rounded-3xl items-center justify-center cursor-pointer transition-all duration-200 ease-out`}
                                onClick={handleSwitch}
                            >
                                Live
                            </li>

                            <li 
                                className={`flex flex-1 ${!isLive ? 'bg-custom-brown text-white' : 'text-custom-brown'} py-1 px-4 rounded-3xl items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out`}
                                onClick={handleSwitch}
                            >
                                ScoreCard
                            </li>
                        </ul>
                    </div>
                    {/* Switch section ends here */}

                    {/* Live or Scoreboard content */}
                    <div className='w-full flex-grow'>
                        {isLive ? <LiveScore /> : <Scorecard />}
                    </div>
                    {/* Live or Scoreboard section ends here */}
                    
                </article>
            </section>
        </main>
    );
}

export default Score;