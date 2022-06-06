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

export const fetchApiGame = async (
  token,
  { category = '', difficulty = '', type = '' } = {},
) => {
  const apiUrl = `${BASE_URL}/api.php?amount=5${
    category && `&category=${category}`
  }${difficulty && `&difficulty=${difficulty}`}${
    type && `&type=${type}`
  }&token=${token}`;

  try {
    const response = await fetch(apiUrl);
    const { results } = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchApiCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api_category.php`);
    const { trivia_categories: triviaCategories } = await response.json();
    return triviaCategories;
  } catch (error) {
    console.log(error);
  }
};
