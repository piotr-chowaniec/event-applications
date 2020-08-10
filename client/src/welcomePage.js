// Import NPM DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => (
  <div id="page-content" className="container text-white text-center">
    <div className="container text-center">
      <h1>Sign up for Event</h1>
      <h3>Hurry up! Number of places is limited!</h3>
      <hr />
      <Link to="/register" className="btn btn-info btn-lg"><i className="fas thumbs-up " /> Sign up to fill up application form!</Link>
    </div>
  </div>
);

export default WelcomePage;
