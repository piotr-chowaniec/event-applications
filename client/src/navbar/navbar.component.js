import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../routes';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div className="container">
      <Link
        to={Routes.MAIN}
        className="navbar-brand mr-5"
      >
        Event<strong>Application</strong>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse justify-content-between" id="main-navbar" />
    </div>
  </nav>
);

export default Navbar;
