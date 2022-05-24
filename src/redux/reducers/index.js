import { combineReducers } from 'redux';
import userReducer from './loginReducer';

const rootReducer = combineReducers({userReducer});

export default rootReducer;
