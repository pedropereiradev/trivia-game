const TOKEN_KEY = 'token';
const RANKING_KEY = 'ranking';

const readRanking = () => {
  if (!JSON.parse(localStorage.getItem(RANKING_KEY))) {
    localStorage.setItem(RANKING_KEY, JSON.stringify([]));
  }

  return JSON.parse(localStorage.getItem(RANKING_KEY));
};

export const saveToken = (token = '') => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  if (!localStorage.getItem(TOKEN_KEY)) {
    localStorage.setItem(TOKEN_KEY, '');
  }

  return localStorage.getItem(TOKEN_KEY);
};

export const saveNewGame = (game) => {
  if (!JSON.parse(localStorage.getItem(RANKING_KEY))) {
    localStorage.setItem(RANKING_KEY, JSON.stringify([]));
  }

  const ranking = readRanking();

  localStorage.setItem(RANKING_KEY, JSON.stringify([...ranking, game]));
};

export const getRanking = () => readRanking();
