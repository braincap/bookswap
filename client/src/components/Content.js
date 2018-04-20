import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Book from './Book';

class Content extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  handleRequestBook = (bookRecordId, requestorId) => {
    if (!this.props.auth.contact) {
      alert(
        'Please enter your contact details (email or phone) in profile section before requesting a book'
      );
      return;
    }
    this.props.requestBook(bookRecordId, requestorId);
  };

  handleDeleteRequest = (bookRecordId, requestorId) => {
    this.props.deleteRequest(bookRecordId, requestorId);
  };

  unlistBook = (bookRecordId, requestorId) => {
    this.props.unlistBook(bookRecordId, requestorId);
  };

  renderContentItems() {
    switch (this.props.auth) {
      case null:
        return [];
      case false:
        return [
          <div key={0} id="welcome">
            <h1>Welcome to BookSwap</h1>
            <h2>
              Please <a href="/auth/google">login</a> to continue
            </h2>
          </div>
        ];
      default:
        return [
          <ul key={0} className="book-catalog">
            {this.props.book.all_books
              .filter(
                book =>
                  !this.props.book.isMyBooks ||
                  book._user === this.props.auth._id
              )
              .map(book => (
                <li
                  className="content-list-item"
                  key={book.id + Math.random(100)}
                  onClick={
                    //Not my book and Is New book
                    book._user !== this.props.auth._id &&
                    !book._requestors.find(
                      requestor => requestor === this.props.auth._id
                    )
                      ? () =>
                          this.handleRequestBook(book._id, this.props.auth._id)
                      : //Not my book and Is Requested book
                        book._user !== this.props.auth._id &&
                        book._requestors.find(
                          requestor => requestor === this.props.auth._id
                        )
                        ? () =>
                            this.handleDeleteRequest(
                              book._id,
                              this.props.auth._id
                            )
                        : //Is my book
                          () => this.unlistBook(book._id, this.props.auth._id)
                  }
                >
                  <Book
                    bookDetails={book}
                    className={
                      book._user === this.props.auth._id ? 'my_book' : ''
                    }
                    section="content"
                    status={
                      book._user === this.props.auth._id
                        ? 'owned'
                        : book._requestors.find(
                            requestor => requestor === this.props.auth._id
                          )
                          ? 'requested'
                          : 'new'
                    }
                  />
                </li>
              ))}
          </ul>
        ];
    }
  }

  render() {
    return (
      <section className={`content`}>
        {this.props.book.search_in_action ? <div className="dim" /> : ''}
        {this.renderContentItems()}
      </section>
    );
  }
}

function mapStateToProps({ auth, book }) {
  return { auth, book };
}

export default connect(mapStateToProps, actions)(Content);
