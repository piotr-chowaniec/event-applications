const authRoutes = {
  LOGIN: '/login',
  REGISTER: '/register',
};

const routes = {
  MAIN: '/',
};

module.exports = {
  Routes: { ...authRoutes, ...routes },
};
