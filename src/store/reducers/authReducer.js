import * as ACTION_TYPES from "../actions/action_type";

export const initialState = {
  isAuth: false,
  username: "",
  token: "",
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        isAuth: true,
        username: action.username,
        token: action.token,
      };
  }
};
