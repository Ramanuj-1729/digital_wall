import { configureStore } from "@reduxjs/toolkit";
import boardCardReducer from "./Slices/BoardCardToggleSlice";
import boardIdReducer from "./Slices/BoardIdSlice";
import searchReducer from "./Slices/SearchSlice";
import boardReducer from "./Slices/BoardSlice";

const store = configureStore({
    reducer: {
        boardCardReducer,
        boardIdReducer,
        searchReducer,
        boardReducer,
    },
});

export default store;