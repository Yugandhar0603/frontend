import React from "react";

const Scorecard = () => {
  const data = {
    team: "United Arab Emirates U19",
    innings: "137-10 (44 Ov)",
    batters: [
      { name: "Aryan Saxena", dismissal: "b Yudhajit Guha", runs: 9, balls: 17, fours: 1, sixes: 0, sr: 52.94 },
      { name: "Akshat Rai", dismissal: "lbw b KP Karthikeya", runs: 26, balls: 52, fours: 1, sixes: 0, sr: 50.0 },
      { name: "Yayin Rai", dismissal: "c Harvansh Singh b Chetan Sharma", runs: 0, balls: 1, fours: 0, sixes: 0, sr: 0.0 },
      { name: "DSouza", dismissal: "c Harvansh Singh b Hardik Raj", runs: 17, balls: 27, fours: 2, sixes: 0, sr: 62.96 },
      { name: "Rayan Khan", dismissal: "b Ayush Mhatre", runs: 35, balls: 48, fours: 3, sixes: 1, sr: 72.92 },
      { name: "Aayan Khan (c)", dismissal: "b Hardik Raj", runs: 5, balls: 5, fours: 1, sixes: 0, sr: 100.0 },
      { name: "Uddish Suri", dismissal: "run out (Ayush Mhatre)", runs: 16, balls: 46, fours: 0, sixes: 0, sr: 34.78 },
      { name: "Noorullah Ayobi", dismissal: "b Chetan Sharma", runs: 9, balls: 23, fours: 1, sixes: 0, sr: 39.13 },
      { name: "Harsh Desai", dismissal: "not out", runs: 7, balls: 22, fours: 0, sixes: 0, sr: 31.82 },
      { name: "Mudit Agarwal (wk)", dismissal: "c KP Karthikeya b Yudhajit Guha", runs: 4, balls: 16, fours: 0, sixes: 0, sr: 25.0 },
      { name: "Ali Asgar Shums", dismissal: "c Harvansh Singh b Yudhajit Guha", runs: 2, balls: 7, fours: 0, sixes: 0, sr: 28.57 },
    ],
    bowlers: [
      { name: "Yudhajit Guha", overs: 7, maidens: 0, runs: 15, wickets: 3, eco: 2.1 },
      { name: "Chetan Sharma", overs: 8, maidens: 1, runs: 27, wickets: 2, eco: 3.4 },
      { name: "Hardik Raj", overs: 10, maidens: 1, runs: 28, wickets: 2, eco: 2.8 },
      { name: "Samarth Nagaraj", overs: 3, maidens: 0, runs: 15, wickets: 0, eco: 5.0 },
      { name: "KP Karthikeya", overs: 10, maidens: 1, runs: 24, wickets: 1, eco: 2.4 },
      { name: "Ayush Mhatre", overs: 5, maidens: 1, runs: 19, wickets: 1, eco: 3.8 },
      { name: "Nikhil Kumar", overs: 1, maidens: 0, runs: 4, wickets: 0, eco: 4.0 },
      { name: "Harvansh Singh", overs: 1, maidens: 0, runs: 5, wickets: 0, eco: 5.0 },
    ],
  };

  return (
    <div
      className="p-4 max-w-screen-lg mx-auto"
      style={{ backgroundColor: "#E6F0DC", color: "#9A6735" }}
    >
      <h2 className="text-xl font-bold mb-4">{data.team} Innings</h2>
      <p className="mb-4">{data.innings}</p>

      {/* Batting Table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 font-medium">Batter</th>
            <th className="text-left p-2 font-medium">Dismissal</th>
            <th className="text-right p-2 font-medium">R</th>
            <th className="text-right p-2 font-medium">B</th>
            <th className="text-right p-2 font-medium">4s</th>
            <th className="text-right p-2 font-medium">6s</th>
            <th className="text-right p-2 font-medium">SR</th>
          </tr>
        </thead>
        <tbody>
          {data.batters.map((batter, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="p-2 text-black">{batter.name}</td>
              <td className="p-2">{batter.dismissal}</td>
              <td className="p-2 text-right">{batter.runs}</td>
              <td className="p-2 text-right">{batter.balls}</td>
              <td className="p-2 text-right">{batter.fours}</td>
              <td className="p-2 text-right">{batter.sixes}</td>
              <td className="p-2 text-right">{batter.sr}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bowling Table */}
      <h3 className="text-lg font-bold mt-6 mb-4">Bowlers</h3>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 font-medium">Bowler</th>
            <th className="text-right p-2 font-medium">O</th>
            <th className="text-right p-2 font-medium">M</th>
            <th className="text-right p-2 font-medium">R</th>
            <th className="text-right p-2 font-medium">W</th>
            <th className="text-right p-2 font-medium">Eco</th>
          </tr>
        </thead>
        <tbody>
          {data.bowlers.map((bowler, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="p-2 text-blue-600">{bowler.name}</td>
              <td className="p-2 text-right">{bowler.overs}</td>
              <td className="p-2 text-right">{bowler.maidens}</td>
              <td className="p-2 text-right">{bowler.runs}</td>
              <td className="p-2 text-right">{bowler.wickets}</td>
              <td className="p-2 text-right">{bowler.eco}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scorecard;
