import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profile extends Component {
  state = {
    name: '',
    city: '',
    state: '',
    contact: ''
  };

  async componentWillMount() {
    await this.props.fetchUser();
    this.setState({
      name: this.props.auth.name,
      city: this.props.auth.city,
      state: this.props.auth.state,
      contact: this.props.auth.contact
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateProfile(
      this.state.name,
      this.state.city,
      this.state.state,
      this.state.contact
    );
  };

  render() {
    return (
      <section className={`profile`}>
        {this.props.book.search_in_action ? <div className="dim" /> : ''}
        <div className="profile-page">
          <form
            className="profile-form"
            onSubmit={e => {
              this.handleSubmit(e);
            }}
          >
            <div>
              <label htmlFor="name">Name </label>
              <input
                type="text"
                name="name"
                placeholder={this.props.auth.name}
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="city">City </label>
              <input
                type="text"
                name="city"
                placeholder={this.props.auth.city}
                value={this.state.city}
                onChange={e => this.setState({ city: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="state">State </label>
              <input
                type="text"
                name="state"
                placeholder={this.props.auth.state}
                value={this.state.state}
                onChange={e => this.setState({ state: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="contact">Contact </label>
              <input
                type="text"
                name="contact"
                placeholder={
                  this.props.auth.contact && this.props.auth.contact.length
                    ? this.props.auth.contact
                    : 'Email or Phone'
                }
                value={this.state.contact}
                onChange={e => this.setState({ contact: e.target.value })}
              />
            </div>
            <button type="submit">Submit!</button>
          </form>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ auth, book }) {
  return { auth, book };
}

export default connect(mapStateToProps, actions)(Profile);
