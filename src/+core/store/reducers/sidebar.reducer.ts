import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
  collapsed: boolean;
}

const initialState: SidebarState = {
  collapsed: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setCollapsed: (state, action: { payload: boolean }) => {
      state.collapsed = action.payload;
    },
  },
});

export const { setCollapsed } = sidebarSlice.actions;

export default sidebarSlice.reducer;
