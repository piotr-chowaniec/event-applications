const authRoutes = {
  LOGIN: '/login',
  REGISTER: '/register',
  ACCESS_DENIED: '/access-denied',
};

const routes = {
  MAIN: '/',
  PROFILE: '/profile',
};

module.exports = {
  Routes: { ...authRoutes, ...routes },
};
