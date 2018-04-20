import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import axios from 'axios';

class Requests extends Component {
  state = {
    userIdMap: {}
  };

  async componentDidMount() {
    await this.props.fetchBooks();
    const res = await axios.get('/api/user_id_details');
    const temp = res.data.map(obj => ({
      [obj._id]: {
        name: obj.name,
        city: obj.city,
        state: obj.state,
        contact: obj.contact
      }
    }));
    this.setState({ userIdMap: Object.assign({}, ...temp) });
  }

  handleRequestApproval = (name, contact) => {
    alert(`${name}'s contact: ${contact}`);
  };

  render() {
    return (
      <section className={`requests`}>
        {this.props.book.search_in_action ? <div className="dim" /> : ''}
        <div className="all-requests">
          <div className="requests-by-me">
            <h2>Requests by me</h2>
            <ul>
              {this.props.book.all_books
                .filter(
                  book => book._requestors.indexOf(this.props.auth._id) !== -1
                )
                .map(book => (
                  <li key={book._id}>
                    <h3>{book.title}</h3>
                  </li>
                ))}
            </ul>
          </div>
          <div className="requests-for-me">
            <h2>
              Requests for me <h6>(click name to view contact for trade)</h6>
            </h2>
            <ul>
              {this.props.book.all_books
                .filter(
                  book =>
                    (book._user === this.props.auth._id) &
                    (book._requestors.length > 0)
                )
                .map(book => (
                  <li key={book._id}>
                    <h3>{book.title}</h3>
                    <ul className="requestor-names">
                      <li>Requestors: </li>
                      <ul className="requestor-names-items">
                        {book._requestors.map(requestor => {
                          if (this.state.userIdMap[requestor]) {
                            const {
                              name,
                              city,
                              state,
                              contact
                            } = this.state.userIdMap[requestor];
                            let returnText = '';
                            (returnText);

                            if (name) {
                              returnText = name;
                            }
                            if (city || state) {
                              returnText += ' from ';
                            }
                            if (city && state) {
                              returnText += `${city}, ${state}`;
                            } else if (city) {
                              returnText += `${city}`;
                            } else if (state) {
                              returnText += `${state}`;
                            }
                            return (
                              <a
                                href="#"
                                onClick={() =>
                                  this.handleRequestApproval(name, contact)
                                }
                              >
                                {returnText}
                              </a>
                            );
                          }
                        })}
                      </ul>
                    </ul>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ auth, book }) {
  return { auth, book };
}

export default connect(mapStateToProps, actions)(Requests);
