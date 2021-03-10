import { compile } from 'path-to-regexp';

const authRoutes = {
  LOGIN: {
    PATH: '/login',
  },
  REGISTER: {
    PATH: '/register',
  },
  ACCESS_DENIED: {
    PATH: '/access-denied',
  },
};

const routes = {
  MAIN: {
    PATH: '/',
  },
  APPLICATION: {
    PATH: '/application',
  },
  APPLICATION_EDIT: {
    PATH: '/application/:applicationId',
    compileRoute: compile('/application/:applicationId'),
  },
  APPLICATIONS: {
    PATH: '/applications',
  },
  USER_EDIT: {
    PATH: '/user/:userId',
    compileRoute: compile('/user/:userId'),
  },
  USERS: {
    PATH: '/users',
  },
};

const userRoutes = {
  PROFILE: {
    PATH: '/user',
  },
  PASSWORD: {
    PATH: '/user/password',
  },
};

const appRoutes = {
  ...authRoutes,
  ...routes,
  ...userRoutes,
};


export default appRoutes;
