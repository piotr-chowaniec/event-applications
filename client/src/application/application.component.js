import React, { useEffect } from 'react';

import { useFetchApplication } from '../store/hooks';

import ApplicationNew from './applicationNew.component';
import ApplicationCurrent from './applicationCurrent.container';

const Application = () => {
  const { call: fetchApplication, status: { data: application } } = useFetchApplication();

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  const ApplicationComponent = () => application?.id
    ? (
      <ApplicationCurrent
        application={application}
        fetchApplication={fetchApplication}
      />
    )
    : (
      <ApplicationNew
        fetchApplication={fetchApplication}
      />
    );

  return (
    <div id="page-content" className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card text-center my-4">
            <div className="card-body">
              {ApplicationComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
