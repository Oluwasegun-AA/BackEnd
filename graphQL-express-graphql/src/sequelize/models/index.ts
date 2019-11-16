import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
// tslint:disable-next-line:variable-name
const Sequelize: any = require('sequelize');
import { log } from '../../helpers';
import databaseConfig from '../config/config.json';

dotenv.config()

let configEnv;
if (process.env.NODE_ENV === 'production') {
  configEnv = databaseConfig.production;
} else {
  configEnv = process.env.NODE_ENV === 'test' ? databaseConfig.test
    : databaseConfig.development;
}

let sequelize: any;
if (configEnv.use_env_variable) {
  sequelize = new Sequelize(process.env[configEnv.use_env_variable], configEnv);
} else {
  sequelize = new Sequelize(
    configEnv.database,
    configEnv.username,
    configEnv.password,
    configEnv
  );
}

sequelize
  .authenticate()
  .then(() => {
    log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    log(`Unable to connect to the database: ${err}`);
  });

const db: any = {};
const basename = path.basename(__filename);
fs
  .readdirSync(__dirname)
  .filter((file: any) => (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
