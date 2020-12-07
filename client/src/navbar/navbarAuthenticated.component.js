import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

import routes from '../routes';
import FaIcon from '../displayComponents/faIcon/faIcon.component';

const NavbarLogin = ({ handleUserLogout, userDisplayName }) => (
  <NavDropdown
    alignRight
    id="navbarLogin"
    title={`Logged In As: ${userDisplayName}`}
  >
    <Link className="dropdown-item" to={routes.PROFILE.PATH}>
      <span className="pr-3">
        <FaIcon icon="user"/>
      </span>
      Profile
    </Link>
    <NavDropdown.Divider />
    <NavDropdown.Item
      onClick={handleUserLogout}
    >
      <span className="pr-3">
        <FaIcon icon="sign-out-alt"/>
      </span>
      Logout
    </NavDropdown.Item>
  </NavDropdown>
);

NavbarLogin.propTypes = {
  handleUserLogout: PropTypes.func.isRequired,
  userDisplayName: PropTypes.string.isRequired,
};

export default NavbarLogin;
