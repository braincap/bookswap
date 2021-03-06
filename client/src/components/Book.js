import React, { Component } from 'react';

class Book extends Component {
  render() {
    const {
      id,
      title,
      subtitle,
      authors = [],
      smallThumbnail
    } = this.props.bookDetails;
    return (
      <div className={`book-card ${this.props.className}`}>
        <img
          src={
            smallThumbnail ||
            'https://res.cloudinary.com/dxmi9d3vj/image/upload/v1521302915/book-3088777_640_rid3cg.png'
          }
          alt="Book cover"
        />
        <div className="book-details">
          <h5 className="title">{title}</h5>
          <h6 className="subtitle">{subtitle}</h6>
          {authors && authors.length ? (
            <h6 className="authors">{authors.join(' | ')}</h6>
          ) : (
            ''
          )}
          {this.props.section === 'content' ? (
            <h5 className={`book-status ${this.props.status}`}>
              {this.props.status === 'new'
                ? 'Click to Request!'
                : this.props.status === 'requested'
                  ? 'Click to Delete Request!'
                  : 'Owned! Click to Unlist'}
            </h5>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default Book;
