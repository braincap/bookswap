import { FETCH_USER, UPDATE_PROFILE } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case UPDATE_PROFILE:
      return action.payload || {};

    default:
      return state;
  }
};
