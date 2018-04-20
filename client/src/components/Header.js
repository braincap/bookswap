import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import SearchRecommendation from './SearchRecommendation';
import * as actions from '../actions';

class Header extends Component {
  state = {
    searchBoxText: '',
    searchRecommendations: [],
    selectedRecommendation: {},
    searchInputFocus: false
  };

  submitBook = async e => {
    e.preventDefault();
    if (!this.state.selectedRecommendation.title) {
      return;
    }
    const res = await axios('/api/submit_book', {
      method: 'post',
      data: this.state.selectedRecommendation,
      withCredentials: true
    });
    console.log(`${res.data.title} added to your account!`);
    this.setState({ searchBoxText: 'Submitted!' });
    setTimeout(() => {
      this.setState({
        searchBoxText: '',
        selectedRecommendation: {},
        searchRecommendations: []
      });
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

  myBooksCheckHandler = e => {
    this.props.setMyBooks(!this.props.book.isMyBooks);
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
                disabled={this.state.searchBoxText === 'Submitted!'}
                className={`search-box ${
                  this.state.searchBoxText === 'Submitted!' ? 'green' : ''
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
                disabled={this.state.searchBoxText === 'Submitted!'}
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
          <div key={1} className="right-menu">
            <Link key={1} className="profile" to="/profile">
              Profile
            </Link>
            <a key={2} className="button" href="/api/logout">
              Logout
            </a>
          </div>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="left-menu">
          <div className="logo">
            <Link onClick={() => this.props.setMyBooks(false)} to="/">
              <h2>BookSwap</h2>
            </Link>
          </div>
          <Link onClick={() => this.props.setMyBooks(false)} to="/">
            All Books
          </Link>
          <div
            className={`nav-filter ${
              this.props.book.isMyBooks ? 'checked' : ''
            }`}
            onClick={this.myBooksCheckHandler}
          >
            <input
              id="my_books"
              type="checkbox"
              checked={this.props.book.isMyBooks}
            />
            <label htmlFor="my_book">My Books</label>
          </div>
          <Link to="/requests">Requests</Link>
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
