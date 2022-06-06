import {
  SET_TRIVIA_SETTINGS_CATEGORY,
  SET_TRIVIA_SETTINGS_DIFFICULTY,
  SET_TRIVIA_SETTINGS_TYPE,
} from '../actions';

const INITIAL_STATE_USER = {
  category: '',
  difficulty: '',
  type: '',
};

const settingsReducer = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
  case SET_TRIVIA_SETTINGS_CATEGORY:
    return {
      ...state,
      category: action.payload,
    };
  case SET_TRIVIA_SETTINGS_DIFFICULTY:
    return {
      ...state,
      difficulty: action.payload,
    };
  case SET_TRIVIA_SETTINGS_TYPE:
    return {
      ...state,
      type: action.payload,
    };
  default:
    return state;
  }
};

export default settingsReducer;
