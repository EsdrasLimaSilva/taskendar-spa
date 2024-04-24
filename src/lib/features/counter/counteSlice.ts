import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0,
    },
    reducers: {
        increase(state) {
            state.count += 1;
        },

        decrease(state) {
            state.count -= 1;
        },
    },
});

export const { decrease, increase } = counterSlice.actions;
export const selectCounter = (store: RootState) => store.counter;
export default counterSlice.reducer;
