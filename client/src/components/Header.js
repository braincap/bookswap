import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import SearchRecommendation from "./SearchRecommendation";
import * as actions from "../actions";

class Header extends Component {
  state = {
    searchBoxText: "",
    searchRecommendations: [],
    selectedRecommendation: {},
    searchInputFocus: false
  };

  submitBook = async e => {
    e.preventDefault();
    if (!this.state.selectedRecommendation.title) {
      return;
    }
    const res = await axios("/api/submit_book", {
      method: "post",
      data: this.state.selectedRecommendation,
      withCredentials: true
    });
    console.log(`${res.data.title} added to your account!`);
    this.setState({ searchBoxText: "Submitted!" });
    setTimeout(() => {
      this.setState({ searchBoxText: "", selectedRecommendation: {} });
    }, 3000);
    this.props.fetchBooks();
  };

  bookSearchAxios = _.throttle(async query => {
    const data = query.length
      ? (await axios.get(`/api/book_search?query=${this.state.searchBoxText}`))
          .data
      : [];
    this.setState({ searchRecommendations: data });
  }, 1000);

  bookListClickHandler = (id, title, subtitle, authors, smallThumbnail) => {
    this.setState(
      {
        selectedRecommendation: { id, title, subtitle, authors, smallThumbnail }
      },
      () =>
        this.setState({
          searchBoxText: this.state.selectedRecommendation.title
        })
    );
  };

  renderHeaderItems() {
    switch (this.props.auth) {
      case null:
        return [];
      case false:
        return [
          <a className="button" href="/auth/google">
            <span>Login with Google</span>
          </a>
        ];
      default:
        return [
          <div key={0} className="search-form">
            <form onSubmit={this.submitBook}>
              <input
                type="text"
                disabled={this.state.searchBoxText === "Submitted!"}
                className={`search-box ${
                  this.state.searchBoxText === "Submitted!" ? "green" : ""
                }`}
                placeholder="Add a book"
                value={this.state.searchBoxText}
                onFocus={() => {
                  this.setState({ searchInputFocus: true });
                  this.props.setSearchInAction(true);
                }}
                onBlur={() => {
                  this.state.searchBoxText.length
                    ? this.setState({ searchInputFocus: false })
                    : this.setState({
                        searchInputFocus: false,
                        selectedRecommendation: {}
                      });
                  this.props.setSearchInAction(false);
                }}
                onChange={async e => {
                  this.setState(
                    { searchBoxText: e.target.value.trim() },
                    () => {
                      this.bookSearchAxios(this.state.searchBoxText);
                    }
                  );
                }}
              />
              <button
                disabled={this.state.searchBoxText === "Submitted!"}
                type="submit"
              >
                Submit
              </button>
            </form>
            <SearchRecommendation
              searchInputFocus={this.state.searchInputFocus}
              bookListClickHandler={this.bookListClickHandler}
              searchRecommendations={this.state.searchRecommendations}
            />
          </div>,
          <a key={1} className="button" href="/api/logout">
            Logout
          </a>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="left-menu">
          <div className="logo">
            <Link to="/">
              <h2>BookSwap</h2>
            </Link>
          </div>
          <Link to="/">All Books</Link>
          <Link to="/mybooks">My Books</Link>
        </div>
        {this.renderHeaderItems()}
      </nav>
    );
  }
}

function mapStateToProps({ auth, book }) {
  return { auth, book };
}

export default connect(mapStateToProps, actions)(Header);
