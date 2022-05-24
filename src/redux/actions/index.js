export const getToken = (token) => ({
  type: 'GET_TOKEN',
  payload: token,
});

export const fetchAPIPlayer = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    console.log(token);
    dispatch(getToken(token));
    localStorage.setItem('token', token);
  } catch (error) {
    console.log(error);
  }
};
