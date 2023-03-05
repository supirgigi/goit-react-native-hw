import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { auth } from '../../firebase/config';
import {
  updateUserProfile,
  authStateChange,
  authSignOut,
  updateAvatar,
  authError,
} from './authReducer';

export const authSignUpUser =
  ({ email, password, nickname, avatar }) =>
  async dispatch => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: nickname,
        photoURL: avatar,
      });

      const { uid, displayName, photoURL } = auth.currentUser;
      const userEmail = auth.currentUser.email;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickName: displayName,
          avatar: photoURL,
          email: userEmail,
        })
      );
    } catch (error) {
      dispatch(authError(error.message));
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async dispatch => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      dispatch(authError(error.message));
    }
  };

export const authSignOutUser = () => async dispatch => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    dispatch(authError(error.message));
  }
};

export const authStateChangeUser = () => async dispatch => {
  onAuthStateChanged(auth, user => {
    if (user) {
      const { uid, displayName, photoURL, email } = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickName: displayName,
          avatar: photoURL,
          email,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export const updateUserAvatar = avatar => async dispatch => {
  if (auth.currentUser) {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: avatar,
      });

      const { photoURL } = auth.currentUser;

      dispatch(updateAvatar({ avatar: photoURL }));
    } catch (error) {
      dispatch(authError(error.message));
    }
  }
};
