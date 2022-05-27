const BASE_URL = 'https://opentdb.com';

export const fetchApiPlayer = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api_token.php?command=request`);
    const { token } = await response.json();
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const fetchApiGame = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/api.php?amount=5&token=${token}`);
    const { results } = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};
