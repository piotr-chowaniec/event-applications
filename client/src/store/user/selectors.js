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
