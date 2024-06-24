import { combineReducers } from 'redux';
import userReducer from './authentication.reducer';
import sidebarReducer from './sidebar.reducer';
import socketReducer from './socket.reducer';

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  socket: socketReducer,
  user: userReducer,
});

export default rootReducer;
