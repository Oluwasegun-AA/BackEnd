import { validateSignupData, validateLoginData } from './auth';
// import {
//   validatePostArticles,
//   validateEditArticles,
//   checkArticleExist,
//   checkAllArticles,
// } from './articles';

import {
  checkUserExist,
  checkUserInParamExist,
  checkAdminInToken,
  checkUserInToken
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
  validateSignupData,
  validateLoginData,
  checkUserExist,
  checkUserInParamExist,
  checkUserInToken,
  checkAdminInToken
};
