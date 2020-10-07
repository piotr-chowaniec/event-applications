const sql = require('mssql');

const { dbConfig } = require('../../config');


const getClient = ({ logger, dbConfig }) => {
  let pool = null;

  const closeConnectionPool = async () => {
    try {
      await pool.close();
      logger.info('Successfully closed DB connection pool.');
    } catch (error) {
      logger.error('Error occurred while closing DB connection pool.', error);
    }
  };

  const createConnectionPool = async () => {
    if (pool) {
      return pool;
    }
    pool = await sql.connect(dbConfig);
    return pool;
  };

  return {
    getConnection: createConnectionPool,
    closeConnection: closeConnectionPool,
  };
};

const databaseConnectionServiceFactory = logger => getClient({ logger, dbConfig });

module.exports = databaseConnectionServiceFactory;
