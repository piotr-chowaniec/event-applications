/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import routes from '../routes';
import { useFetchAllApplications, useDeleteApplication } from '../store/hooks';
import { transformToDate } from '../displayComponents/formatters';

const ApplicationItem = ({ application, onDelete }) => (
  <tr>
    <td>{application?.user?.email}</td>
    <td>{application?.user?.firstName}</td>
    <td>{application?.user?.lastName}</td>
    <td>{application?.user?.role}</td>
    <td>{transformToDate(application.eventDate, 'PPP')}</td>
    <td>{transformToDate(application.createdAt, 'PPP')}</td>
    <td>
      <Link
        className="btn btn-sm btn-outline-info"
        to={routes.APPLICATION_EDIT.compileRoute({ applicationId: application?.id })}
      >
        Edit
      </Link>
    </td>
    <td>
      <Button
        size="sm"
        variant="outline-danger"
        onClick={onDelete(application?.id)}
      >
        Delete
      </Button>
    </td>
  </tr>
);

ApplicationItem.propTypes = {
  application: PropTypes.shape({
    id: PropTypes.number.isRequired,
    eventDate: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  }),
  onDelete: PropTypes.func.isRequired,
};

const Applications = () => {
  const { call: fetchApplication, status: { data: applications } } = useFetchAllApplications();
  const { call: deleteApplication } = useDeleteApplication();

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  const onApplicationRemove = useCallback(id => async () => {
    await deleteApplication({ id });
    await fetchApplication();
  }, [deleteApplication, fetchApplication]);

  return (
    <div id="page-content" className="container">
      <div className="card text-center">
        <div className="card-body">
          <h3 className="card-title my-3"><code className="text-muted">All Event Applications</code></h3>

          <div className="table-responsive py-2">
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Event Date</th>
                  <th scope="col">Created at</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {applications?.map(application => (
                  <ApplicationItem
                    key={application?.id}
                    application={application}
                    onDelete={onApplicationRemove}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
