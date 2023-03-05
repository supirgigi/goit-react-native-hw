import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  nickName: null,
  stateChange: false,
  avatar: null,
  email: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
      error: null,
    }),

    authSignOut: () => initialState,

    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
      avatar: payload.avatar,
      email: payload.email,
      error: null,
    }),

    updateAvatar: (state, { payload }) => ({
      ...state,
      avatar: payload.avatar,
      error: null,
    }),

    authError: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
});

// actions
export const {
  updateUserProfile,
  authStateChange,
  authSignOut,
  updateAvatar,
  authError,
} = authSlice.actions;

// reducer
export const authReducer = authSlice.reducer;
