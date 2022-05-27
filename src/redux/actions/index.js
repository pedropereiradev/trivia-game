export const saveUserEmail = (gravatarEmail) => ({
  type: 'CHANGE_EMAIL',
  payload: gravatarEmail,
});

export const saveUserName = (name) => ({
  type: 'CHANGE_NAME',
  payload: name,
});

export const saveScore = (score) => ({
  type: 'CHANGE_SCORE',
  payload: score,
});

export const getAssertions = (assertions) => ({
  type: 'GET_ASSERTIONS',
  payload: assertions,
});
