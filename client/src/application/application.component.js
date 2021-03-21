import React, { useEffect } from 'react';

import Loading from '../displayComponents/loading/loading.component';

import ApplicationNew from './applicationNew.component';
import ApplicationCurrent from './applicationCurrent.container';
import { useFetchUserApplication } from './api/hooks';

const Application = () => {
  const {
    call: fetchApplication,
    isLoading,
    status: { data: application },
  } = useFetchUserApplication();

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
              <Loading isLoading={isLoading} />
              {ApplicationComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
