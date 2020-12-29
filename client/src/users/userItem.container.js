import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import routes from '../routes';
import { userDataSelector } from '../store/user/selectors';
import { userPropTypes } from '../shared/propTypes';
import { transformToDate } from '../displayComponents/formatters';

const UserItem = ({
  user,
  currentUser,
  onDelete,
}) => {
  const isCurrentUser = user?.id === currentUser?.id;

  return (
    <tr>
      <td>{user?.email}</td>
      <td>{user?.firstName}</td>
      <td>{user?.lastName}</td>
      <td>{user?.role}</td>
      <td>{user?.eventDate ? transformToDate(user.eventDate, 'PPP') : 'None'}</td>
      <td>
        <Link
          className="btn btn-sm btn-outline-info"
          to={isCurrentUser
            ? routes.PROFILE.PATH
            : routes.USER_EDIT.compileRoute({ userId: user?.id })
          }
        >
          Edit
        </Link>
      </td>
      <td>
        { !isCurrentUser && (

          <Button
            size="sm"
            variant="outline-danger"
            onClick={onDelete(user?.id)}
          >
            Delete
          </Button>
        )}
      </td>
    </tr>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    eventDate: PropTypes.string,
  }),
  currentUser: userPropTypes,
  onDelete: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    currentUser: userDataSelector(state),
  }),
  null,
)(UserItem);
