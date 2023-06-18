import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    boardName: '',
};

const boardSlice = createSlice({
    name: 'displayBoard',
    initialState,
    reducers: {
        boardN: (state, action) => {
            state.boardName = action.payload;
        },
    },
});

export const { boardN } = boardSlice.actions;
export default boardSlice.reducer;
