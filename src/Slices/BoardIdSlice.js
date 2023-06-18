import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    boardId: null,
};

const boardIdSlice = createSlice({
    name: 'changeId',
    initialState,
    reducers: {
        boardIdState: (state, action) => {
            state.boardId = action.payload;
        },
    },
});

export const { boardIdState } = boardIdSlice.actions;
export default boardIdSlice.reducer;
