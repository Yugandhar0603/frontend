import { createSlice } from '@reduxjs/toolkit';

const matchesSlice = createSlice({
    name: 'matches',
    initialState: {
        matches: [],
        count: 0
    },
    reducers: {
        addMatch: (state, action) => {
            state.matches.push(action.payload);
            state.count = state.matches.length;
        },
        setMatches: (state, action) => {
            state.matches = action.payload;
            state.count = action.payload.length;
        }
    }
});

export const { addMatch, setMatches } = matchesSlice.actions;
export default matchesSlice.reducer; 