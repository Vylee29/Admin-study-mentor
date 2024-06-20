import { combineReducers } from 'redux';
import userReducer from './authentication.reducer';
import counterReducer from './counter.reducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

export default rootReducer;
