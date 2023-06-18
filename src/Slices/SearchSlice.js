import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchText: '',
};

const searchSlice = createSlice({
    name: 'searchT',
    initialState,
    reducers: {
        search: (state, action) => {
            state.searchText = action.payload;
        },
    },
});

export const { search } = searchSlice.actions;
export default searchSlice.reducer;
