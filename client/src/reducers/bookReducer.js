import {
  SEARCH_IN_ACTION,
  FETCH_BOOKS,
  MY_BOOKS,
  REQUEST_BOOK,
  DELETE_REQUEST,
  UNLIST_BOOK
} from '../actions/types';

export default (
  state = { all_books: [], search_in_action: false, isMyBooks: false },
  action
) => {
  switch (action.type) {
    case SEARCH_IN_ACTION:
      return { ...state, search_in_action: action.payload || false };
    case FETCH_BOOKS:
      return { ...state, all_books: action.payload || [] };
    case REQUEST_BOOK:
      return { ...state, all_books: action.payload || [] };
    case DELETE_REQUEST:
      return { ...state, all_books: action.payload || [] };
    case UNLIST_BOOK:
      return { ...state, all_books: action.payload || [] };
    case MY_BOOKS:
      return { ...state, isMyBooks: action.payload || false };
    default:
      return { ...state, search_in_action: false };
  }
};
