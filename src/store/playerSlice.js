import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    playerData: {
        name: "Virat Kohli",
        role: "Batsman",
        team: "India",
        age: 35,
        jerseyNumber: 18,
        battingStyle: "Right Handed",
        battingStats: {
            matches: 511,
            runs: 25957,
            average: 53.51,
            strikeRate: 93.62,
            hundreds: 80,
            fifties: 139,
            highestScore: "254*",
            testRuns: 8848,
            odiRuns: 13848,
            t20Runs: 4008
        },
        achievements: [
            "ICC Cricketer of the Year (2017, 2018)",
            "Rajiv Gandhi Khel Ratna Award (2018)",
            "Padma Shri (2017)",
            "ICC ODI Player of the Year (2012, 2017)",
            "Wisden Leading Cricketer in the World (2016, 2017, 2018)"
        ],
        recentForm: [
            { match: "IND vs AUS", score: "85", date: "2024-03-15", format: "ODI" },
            { match: "IND vs ENG", score: "120*", date: "2024-03-10", format: "Test" },
            { match: "IND vs SA", score: "45", date: "2024-03-05", format: "T20" }
        ],
        careerHighlights: [
            "Fastest to 10,000 ODI runs",
            "Most double centuries in Test cricket as captain",
            "Most runs in a single IPL season",
            "Most fifties in T20I cricket"
        ],
        awards: [
            { year: 2018, award: "ICC Test Player of the Year" },
            { year: 2017, award: "ICC ODI Player of the Year" },
            { year: 2016, award: "ICC Spirit of Cricket" }
        ]
    }
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        updatePlayerStats: (state, action) => {
            state.playerData = { ...state.playerData, ...action.payload };
        }
    }
});

export const { updatePlayerStats } = playerSlice.actions;
export default playerSlice.reducer; 