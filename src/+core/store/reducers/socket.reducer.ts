import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

type SocketState = {
    socket: Socket | null;
};

const initialState: SocketState = {
    socket: null,
};

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        onConnect: (state, action: { payload: any }) => {
            state.socket = action.payload;
        },
        onDisconnect: (state) => {
            state.socket = null;
        },
    },
});

export const { onConnect, onDisconnect } = socketSlice.actions;

export default socketSlice.reducer;
