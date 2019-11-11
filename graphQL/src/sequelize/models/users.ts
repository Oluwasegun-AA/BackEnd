const usersModel: any = (db: any, sequelize: any): any => {
  const users = db.define('Users', {
    id: {
      type: sequelize.UUID,
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
    }
  }, {
    freezeTableName: true,
  });
  users.associate = function () {
    // associations can be defined here
  };
  return users;
};
export default usersModel;
