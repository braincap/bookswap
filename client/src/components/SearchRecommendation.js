import React, { Component } from "react";
import Book from "./Book";

class SearchRecommendation extends Component {
  renderSuggestionCard(id, title, subtitle, authors, smallThumbnail) {
    return (
      <div className="book-card">
        <img
          src={
            smallThumbnail ||
            "https://cdn.pixabay.com/photo/2018/01/17/18/43/book-3088777_1280.png"
          }
          alt="Book cover"
        />
        <div className="book-details">
          <h5>{title}</h5>
          {authors.length ? <h6>{authors.join(" | ")}</h6> : ""}
        </div>
      </div>
    );
  }

  render() {
    return (
      <ul
        className="search-list"
        style={{ visibility: this.props.searchInputFocus ? "" : "hidden" }}
      >
        {this.props.searchRecommendations.map(
          ({ id, title, subtitle, authors = [], smallThumbnail }) => {
            return (
              <li
                key={id}
                onClick={() => {
                  this.props.bookListClickHandler(
                    id,
                    title,
                    subtitle,
                    authors,
                    smallThumbnail
                  );
                }}
              >
                <Book
                  bookDetails={{ id, title, subtitle, authors, smallThumbnail }}
                  className="suggestion"
                />
              </li>
            );
          }
        )}
      </ul>
    );
  }
}

export default SearchRecommendation;
