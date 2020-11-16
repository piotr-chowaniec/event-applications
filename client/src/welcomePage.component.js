import React from 'react';
import { Link } from 'react-router-dom';

import routes from './routes';

const WelcomePage = () => (
  <div id="page-content" className="container text-white text-center">
    <h1>Sign up for Event</h1>
    <h3>Hurry up! Number of places is limited!</h3>
    <hr />
    <Link
      to={routes.REGISTER}
      className="btn btn-info btn-lg"
    >
      Sign up to fill up application form!
    </Link>
  </div>
);

export default WelcomePage;
