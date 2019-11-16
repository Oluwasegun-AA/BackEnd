import { Password } from '../../helpers';

const usersModel: any = (db: any, sequelize: any): any => {
  const users = db.define('Users', {
    id: {
      type: sequelize.UUID,
      primaryKey: true,
      unique: {
        name: 'id',
        msg: 'A user with this ID already exist in the database'
      },
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
      unique: {
        name: 'email',
        msg: 'A users with this email already exist in the database'
      },
      validate: {
        isEmail: {
          args: true,
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
      unique: {
        name: 'username',
        msg: 'A user with this username already exist in the database'
      },
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
    }
  }, {
    freezeTableName: true,
    hooks: {
      beforeCreate: async (data: any) => {
        data.password = await Password.encrypt(data.password);
      },
      beforeUpdate: async (data: any) => {
        data.password = await Password.encrypt(data.password);
      }
    }
  });
  users.associate = function () {
    // associations
  };
  return users;
};
export default usersModel;
