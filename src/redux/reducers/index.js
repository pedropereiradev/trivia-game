import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  triviaSettings: settingsReducer,
});

export default rootReducer;
