import { FETCH_USER, UPDATE_PROFILE } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case UPDATE_PROFILE: {
      return action.payload || false;
    }

    default:
      return state;
  }
};
