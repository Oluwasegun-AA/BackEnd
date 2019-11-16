import authHandler from './authResolver';
import userHandler from './usersResolver';

export default {...authHandler, ...userHandler};
