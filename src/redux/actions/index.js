export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';

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
