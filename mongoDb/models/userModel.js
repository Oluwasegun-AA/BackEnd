import { pick } from 'lodash';
import uuid from 'uuid/v4';
import { MakeSchema } from '../helpers';

const rules = {
  id: {
    type: String,
    minlength: 36,
    unique: true,
    default: uuid(),
  },
  firstName: {
    type: String,
    maxlength: 30,
    minlength: 3,
    required: [true, 'firstName not supplied'],
  },
  lastName: {
    type: String,
    maxlength: 30,
    minlength: 3,
    required: [true, 'lastName not supplied'],
  },
  username: {
    type: String,
    maxlength: 30,
    minlength: 3,
    unique: true,
    required: [true, 'username not supplied'],
  },
  email: {
    type: String,
    maxlength: 30,
    minlength: 10,
    unique: true,
    required: [true, 'email not supplied'],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'password not supplied'],
  },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User',
  },
  createdAt: { type: Date, default: Date.now },
};

const controller = new MakeSchema('Users', rules);
const loginController = new MakeSchema(
  'Login',
  pick(rules, ['email', 'password'])
);
const LoginModel = loginController.getModel();
const UserModel = controller.getModel();
const UserSchema = controller.getSchema();

export { UserModel, UserSchema, LoginModel };
