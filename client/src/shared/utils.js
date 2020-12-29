export const getUserDisplayName = user => user?.firstName
  ? `${user?.firstName} ${user?.lastName}`
  : '';
