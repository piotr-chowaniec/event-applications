const userRoutes = ({ router }) => {
  router.get('/', async (req, res, next) => {
    try {
      res.statusStatus(200);
    } catch (error) {
      next(error);
    }
  });

  return router;
};

module.exports = userRoutes;
