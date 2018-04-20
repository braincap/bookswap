import { FETCH_USER, UPDATE_PROFILE } from '../actions/types';

export default (state = { _id: false }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || { _id: false };
    case UPDATE_PROFILE:
      return action.payload || { _id: false };

    default:
      return state;
  }
};
