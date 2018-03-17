import { FETCH_USER, SEARCH_IN_ACTION, FETCH_BOOKS } from "./types";
import axios from "axios";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const setSearchInAction = focus => {
  return { type: SEARCH_IN_ACTION, payload: focus };
};

export const fetchBooks = () => async dispatch => {
  const res = await axios.get("/api/all_books");
  dispatch({ type: FETCH_BOOKS, payload: res.data });
};
