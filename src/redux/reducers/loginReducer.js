const INITIAL_STATE_USER = {
  name: '',
  email: '',
  score: 0,
};

const userReducer = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
  case 'CHANGE_EMAIL':
    return { ...state, email: action.payload };
  case 'CHANGE_NAME':
    return { ...state, name: action.payload };
  default:
    return state;
  }
};

export default userReducer;
