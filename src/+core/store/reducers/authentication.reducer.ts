import { createSlice } from '@reduxjs/toolkit';
import { UserResp } from '../../models/profile.model';

interface AuthenticationState {
  accessToken: string;
  user?: UserResp;
}

const initialState: AuthenticationState = {
  accessToken: '',
  user: undefined,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAccessToken: (state, action: { payload: string }) => {
      state.accessToken = action.payload;
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

export const { setAccessToken, removeAccessToken, setUser, removeUser } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
