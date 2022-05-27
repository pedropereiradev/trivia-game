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

export const getToken = (token) => ({
  type: 'GET_TOKEN',
  payload: token,
});

export const getAssertions = (assertions) => ({
  type: 'GET_ASSERTIONS',
  payload: assertions,
});

export const fetchAPIPlayer = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    // console.log(token);
    dispatch(getToken(token));
    localStorage.setItem('token', token);
  } catch (error) {
    console.log(error);
  }
};
