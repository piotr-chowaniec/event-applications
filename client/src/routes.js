const authRoutes = {
  LOGIN: '/login',
  REGISTER: '/register',
  ACCESS_DENIED: '/access-denied',
};

const routes = {
  MAIN: '/',
  APPLICATION: '/application',
  APPLICATION_EDIT: '/application/edit',
  APPLICATIONS: '/applications',
};

const userRoutes = {
  PROFILE: '/user/profile',
  PASSWORD: '/user/password',
};

export default {
  ...authRoutes,
  ...routes,
  ...userRoutes,
};
