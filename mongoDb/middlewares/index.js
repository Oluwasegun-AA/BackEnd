import { validateSignupData, validateLoginData } from './auth';
import {
  validatePostChats,
  checkChatExist,
  checkAllChats,
  checkChatIdExists,
  checkUserHasChats,
  checkUserIsAdmin,
  checkUserInChat
} from './chats';

import {
  checkUserExist,
  checkUserInParamExist,
  checkAdminInToken,
  checkUserInToken,
} from './users';
// export {
//   validateSignupData,
//   validateLoginData,
//   validatePostArticles,
//   validateEditArticles,
//   checkUserExist,
//   checkUserInToken,
//   checkArticleExist,
//   checkAllArticles,
//   checkAdminInToken,
//   checkUserInParamExist
// };

export {
  validatePostChats,
  checkUserHasChats,
  checkUserIsAdmin,
  checkUserInChat,
  checkChatExist,
  checkAllChats,
  checkChatIdExists,
  validateSignupData,
  validateLoginData,
  checkUserExist,
  checkUserInParamExist,
  checkUserInToken,
  checkAdminInToken,
};
