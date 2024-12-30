import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // Disable logging; default: console.log
  });
  
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
      await sequelize.sync();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();
  
  export default sequelize;