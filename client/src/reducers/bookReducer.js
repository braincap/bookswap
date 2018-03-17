import { SEARCH_IN_ACTION, FETCH_BOOKS } from "../actions/types";

export default (state = { all_books: [] }, action) => {
  switch (action.type) {
    case SEARCH_IN_ACTION:
      return { ...state, search_in_action: action.payload || false };
    case FETCH_BOOKS:
      return { ...state, all_books: action.payload || false };
    default:
      return { ...state, search_in_action: false };
  }
};
