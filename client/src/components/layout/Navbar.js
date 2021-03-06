import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a href="/" onClick={this.onLogoutClick.bind(this)} className="nav-link"><img className='rounded-circle' src={user.avatar} alt={user.name} style={{ width: '25px', marginRight: '5px' }} title="Delogare" /> Delogare </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Inregistrare</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Autentificare</Link>
        </li>
      </ul>
    );

    const authProb = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/getexercise"> Probleme </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/postexercise"> Adauga probleme </Link>
        </li> */}
      </ul>
    )
    const guestProb = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/getexercise"> Probleme </Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Blackbird</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authProb : guestProb}

            {isAuthenticated ? authLinks : guestLinks}

          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);