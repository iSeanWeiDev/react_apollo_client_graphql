import { Auth } from 'aws-amplify';

export const isAuthenticated = async () => {
  let user = null;
  try {
    user = await Auth.currentAuthenticatedUser();

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
