import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Book from "./Book";

class Content extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

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
            {this.props.book.all_books.map(book => (
              <li key={book.id + Math.random(10)}>
                <Book bookDetails={book} />
              </li>
            ))}
          </ul>
        ];
    }
  }

  render() {
    return (
      <section className={`content`}>
        {this.props.book.search_in_action ? <div className="dim" /> : ""}
        {this.renderContentItems()}
      </section>
    );
  }
}

function mapStateToProps({ auth, book }) {
  return { auth, book };
}

export default connect(mapStateToProps, actions)(Content);
