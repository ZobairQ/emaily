import { FETCH_USER } from "../actions/types";

const authReducer = (intialState = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false ;
    default:
      return intialState;
  }
};

export default authReducer;
