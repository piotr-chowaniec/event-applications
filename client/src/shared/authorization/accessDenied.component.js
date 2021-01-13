import React from 'react';

const AccessDenied = () => (
  <div id="access-denied" className="container">
    <div className="row justify-content-center">
      <div className="col">
        <div className="card text-center my-4">
          <div className="card-body">
            <h1>Access Denied</h1>
            <h3>Ups! It seams that you&apos;ve no access to that content</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AccessDenied;
