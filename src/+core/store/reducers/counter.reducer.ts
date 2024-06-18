import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
    counter: number;
}

const initialState: CounterState = {
    counter: 0,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increaseCounter: (state, action: { payload: number }) => {
            state.counter = action.payload;
        },
        decreaseCounter: (state, action: { payload: number }) => {
            state.counter = action.payload;
        },
    },
});

export const { decreaseCounter, increaseCounter } = counterSlice.actions;

export default counterSlice.reducer;
