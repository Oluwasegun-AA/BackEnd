
import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, sequelize: any) => {
    return queryInterface.createTable('Users', {
      id: {
        type: sequelize.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4,
      },
      firstName: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
          len: [5, 30],
          is: {
            args: /^[a-z']+$/i,
            msg: 'First name must contain only Alphabets'
          }
        }
      },
      lastName: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
          len: [5, 30],
          is: {
            args: /^[a-z']+$/i,
            msg: 'Last name must contain only Alphabets'
          }
        }
      },
      email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email must be a valid'
          }
        }
      },
      password: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 30],
            msg: 'Password must be more than 5 characters'
          }
        }
      },
      username: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [4, 30],
            msg: 'Username must be more than 3 characters'
          }
        }
      },
      isAdmin: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      verified: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isDeleted: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE
      },
      updatedAt: {
        type: sequelize.DATE
      }
    });
  },
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('Users')
};
