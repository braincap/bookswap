import {
  FETCH_USER,
  SEARCH_IN_ACTION,
  FETCH_BOOKS,
  MY_BOOKS,
  REQUEST_BOOK,
  DELETE_REQUEST,
  UNLIST_BOOK
} from './types';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const setSearchInAction = focus => {
  return { type: SEARCH_IN_ACTION, payload: focus };
};

export const fetchBooks = () => async dispatch => {
  const res = await axios.get('/api/all_books');
  dispatch({ type: FETCH_BOOKS, payload: res.data });
};

export const setMyBooks = isMyBooks => {
  return { type: MY_BOOKS, payload: isMyBooks };
};

export const requestBook = (bookRecordId, requestorId) => async dispatch => {
  let res;
  try {
    res = await axios('/api/request_book', {
      method: 'post',
      data: { bookRecordId, requestorId },
      withCredentials: true
    });
  } catch (err) {
    console.log(err);
    return;
  }
  dispatch({ type: REQUEST_BOOK, payload: res.data });
};

export const deleteRequest = (bookRecordId, requestorId) => async dispatch => {
  let res;
  try {
    res = await axios('/api/delete_request', {
      method: 'post',
      data: { bookRecordId, requestorId },
      withCredentials: true
    });
  } catch (err) {
    console.log(err);
    return;
  }
  dispatch({ type: DELETE_REQUEST, payload: res.data });
};

export const unlistBook = (bookRecordId, requestorId) => async dispatch => {
  let res;
  try {
    res = await axios('/api/unlist_book', {
      method: 'post',
      data: { bookRecordId, requestorId },
      withCredentials: true
    });
  } catch (err) {
    console.log(err);
    return;
  }
  dispatch({ type: UNLIST_BOOK, payload: res.data });
};
