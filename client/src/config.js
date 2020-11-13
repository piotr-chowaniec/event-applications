export default {
  AUTH: {
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY || 'access_token',
    AUTHORIZATION_KEY: process.env.AUTHORIZATION_KEY || 'authorization',
  },
  QUERY_CONFIG: {
    retry: false,
    staleTime: 1000 * 60 * 60, // 1h in milliseconds
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  },
};
