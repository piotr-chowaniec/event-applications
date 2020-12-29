import { createSelector } from 'reselect';

import { getUserDisplayName } from '../../shared/utils';

export const userDataSelector = ({ user }) => user.user;
export const userDisplayNameSelector = createSelector(
  [
    userDataSelector,
  ],
  getUserDisplayName,
);
export const isAuthenticatedSelector = createSelector(
  [
    userDataSelector,
  ],
  user => Boolean(user?.id),
);
export const isAdminSelector = createSelector(
  [
    userDataSelector,
  ],
  user => user?.role === 'admin',
);
