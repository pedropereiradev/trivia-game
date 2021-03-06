import {
  CHANGE_EMAIL,
  CHANGE_NAME,
  CHANGE_SCORE,
  GET_ASSERTIONS,
} from '../actions';

const INITIAL_STATE_USER = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

const playerReducer = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
  case CHANGE_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  case CHANGE_NAME:
    return { ...state, name: action.payload };
  case CHANGE_SCORE:
    return { ...state, score: action.payload };
  case GET_ASSERTIONS:
    return { ...state, assertions: action.payload };
  default:
    return state;
  }
};

export default playerReducer;
