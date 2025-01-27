import React from 'react';

function LiveScore() {
  // Sample data
    const teamName = "Team A";
    const totalRuns = 150;
    const totalWickets = 3;
    const overs = "15.3";
    const crr = "9.68";

    const batsmen = {
        striker: { name: "Player 1", runs: 45, balls: 30 },
        nonStriker: { name: "Player 2", runs: 60, balls: 40 },
    };

    const bowler = { name: "Bowler 1", overs: 3, runs: 30, wickets: 1 };

    return (
        <div className="w-full h-full box-border p-4 bg-[#F5F5DC] cursor-pointer">

            {/* top seciton of major display starts here */}
            <div className="flex flex-col justify-between w-full">

                {/* Team name section starts here */}
                <div>
                    <h1 className='text-heading text-xl md:text-2xl lg:text-3xl text-custom-brown'>Australia</h1>
                </div>
                {/* Team name section ends here */}

                {/* Score data section starts here */}
                <div 
                    className='w-full flex items-center justify-between pr-2 '
                >
                    <div className='flex gap-x-2 text-2xl md:text-3xl lg:text-4xl text-heading'>
                        <span>123-5</span>
                        <span>(13.4)</span>
                    </div>
                    <div className='flex items-center text-base md:text-lg lg:text-xl text-content'>
                        <span>CRR:</span>
                        <span>9.2</span>
                    </div>
                </div>
                {/* Score section ends here */}

            </div>
            {/* top section of major display ends here */}

            {/* Batsman section starts here */}
            <div className="mt-4">
                <table className="w-full text-left border-collapse font-content">
                    <thead>
                        <tr className="bg-custom-light-green text-custom-brown">
                            <th className="p-2">Batter</th>
                            <th className="p-2">R</th>
                            <th className="p-2">B</th>
                            <th className="p-2">4s</th>
                            <th className="p-2">6s</th>
                            <th className="p-2">SR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-green-200'>
                            <td className="p-2">Timothy Moore *</td>
                            <td className="p-2">2</td>
                            <td className="p-2">4</td>
                            <td className="p-2">0</td>
                            <td className="p-2">0</td>
                            <td className="p-2">50.00</td>
                        </tr>
                        <tr className='bg-green-100'>
                            <td className="p-2">Kiefer Yamamoto-Lake</td>
                            <td className="p-2">4</td>
                            <td className="p-2">18</td>
                            <td className="p-2">0</td>
                            <td className="p-2">0</td>
                            <td className="p-2">22.22</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Batsman section ends here */}

            {/* Bowler section starts here */}
            <div className="mt-4">
                <table className="w-full text-left border-collapse font-content">
                    <thead>
                        <tr className="bg-custom-light-green text-custom-brown ">
                            <th className="p-2">Bowler</th>
                            <th className="p-2">O</th>
                            <th className="p-2">M</th>
                            <th className="p-2">R</th>
                            <th className="p-2">W</th>
                            <th className="p-2">ECO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-green-200'>
                            <td className="p-2">Mohammed Huzaifa *</td>
                            <td className="p-2">3.3</td>
                            <td className="p-2">1</td>
                            <td className="p-2">4</td>
                            <td className="p-2">1</td>
                            <td className="p-2">1.10</td>
                        </tr>
                        {/* <tr>
                            <td className="p-2">Ahmed Hussain</td>
                            <td className="p-2">5</td>
                            <td className="p-2">1</td>
                            <td className="p-2">10</td>
                            <td className="p-2">1</td>
                            <td className="p-2">2.00</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
            {/* Bowler section ends here */}

        </div>
    );
}

export default LiveScore;