import React, { useEffect, useCallback } from 'react';

import { useDeleteUser } from '../shared/api/hooks';

import UserItem from './userItem.container';
import { useFetchAllUsers } from './api/hooks';

const Users = () => {
  const { call: fetchUsers, status: { data: users } } = useFetchAllUsers();
  const { call: deleteUser } = useDeleteUser();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onUserRemove = useCallback(userId => async () => {
    await deleteUser({ userId });
    await fetchUsers();
  }, [deleteUser, fetchUsers]);

  return (
    <div id="page-content" className="container">
      <div className="card text-center">
        <div className="card-body">
          <h3 className="card-title my-3"><code className="text-muted">All Users</code></h3>

          <div className="table-responsive py-2">
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Event Date</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users?.map(user => (
                  <UserItem
                    key={user?.id}
                    user={user}
                    onDelete={onUserRemove}
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

export default Users;
