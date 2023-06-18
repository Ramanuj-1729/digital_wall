import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isToggle: false,
};

const boardCardToggleSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        toggleState: (state) => {
            state.isToggle = !state.isToggle;
        },
    },
});

export const { toggleState } = boardCardToggleSlice.actions;
export default boardCardToggleSlice.reducer;
