import { createSelector } from 'reselect';

export const userDataSelector = ({ user }) => user.user;
export const userDisplayNameSelector = createSelector(
  [
    userDataSelector,
  ],
  user => user?.firstName
    ? `${user?.firstName} ${user?.lastName}`
    : '',
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
