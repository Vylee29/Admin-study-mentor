import { createSlice } from '@reduxjs/toolkit';
import { UserResp } from '../../models/profile.model';

interface AuthenticationState {
  accessToken: string;
  user?: UserResp;
  isLoggedIn: boolean;
}

const initialState: AuthenticationState = {
  accessToken: '',
  user: undefined,
  isLoggedIn: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAccessToken: (state, action: { payload: string }) => {
      state.accessToken = action.payload;
    },
    setLoggedIn: (state, action: { payload: boolean }) => {
      state.isLoggedIn = action.payload;
    },
    removeAccessToken: (state) => {
      state.accessToken = '';
    },
    setUser: (state, action: { payload: UserResp }) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = {} as UserResp;
    },
  },
});

export const { setAccessToken, removeAccessToken, setUser, removeUser, setLoggedIn } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
