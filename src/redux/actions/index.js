export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';

export const SET_TRIVIA_SETTINGS_CATEGORY = 'SET_TRIVIA_SETTINGS_CATEGORY';
export const SET_TRIVIA_SETTINGS_DIFFICULTY = 'SET_TRIVIA_SETTINGS_DIFFICULTY';
export const SET_TRIVIA_SETTINGS_TYPE = 'SET_TRIVIA_SETTINGS_TYPE';

export const saveUserEmail = (gravatarEmail) => ({
  type: CHANGE_EMAIL,
  payload: gravatarEmail,
});

export const saveUserName = (name) => ({
  type: CHANGE_NAME,
  payload: name,
});

export const saveScore = (score) => ({
  type: CHANGE_SCORE,
  payload: score,
});

export const getAssertions = (assertions) => ({
  type: GET_ASSERTIONS,
  payload: assertions,
});

export const setTriviaSettingsCategory = (category) => ({
  type: SET_TRIVIA_SETTINGS_CATEGORY,
  payload: category,
});

export const setTriviaSettingsDifficulty = (difficulty) => ({
  type: SET_TRIVIA_SETTINGS_DIFFICULTY,
  payload: difficulty,
});

export const setTriviaSettingsType = (type) => ({
  type: SET_TRIVIA_SETTINGS_TYPE,
  payload: type,
});
