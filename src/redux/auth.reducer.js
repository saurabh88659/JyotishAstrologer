import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  userData: null,
  isDark: false,
  internetSpeed: 'Checking',
  chatRoom: null,
  agoraToken: null,
  agoraEng: null,
  appId: null,
  userRouteData: null,
  whoosh: null,
  connectionData: null,
  kundali: null,
  kundaliLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsDark: (state, action) => {
      state.isDark = action.payload;
    },
    setInternetSpeed: (state, action) => {
      state.internetSpeed = action.payload;
    },
    setChatRoom: (state, action) => {
      state.chatRoom = action.payload;
    },
    setAgoraToken: (state, action) => {
      state.agoraToken = action.payload;
    },
    setAgoraEng: (state, action) => {
      state.agoraEng = action.payload;
    },
    setAppId: (state, action) => {
      state.appId = action.payload;
    },
    setUserRouteData: (state, action) => {
      state.userRouteData = action.payload;
    },
    setWhoosh: (state, action) => {
      state.whoosh = action.payload;
    },
    setConnectionData: (state, action) => {
      state.connectionData = action.payload;
    },
    setKundali: (state, action) => {
      state.kundali = action.payload;
    },
    setkundaliLoading: (state, action) => {
      state.kundaliLoading = action.payload;
    },
  },
});

export const {
  setKundali,
  setLoggedIn,
  setUserData,
  setIsDark,
  setInternetSpeed,
  setChatRoom,
  setAgoraToken,
  setAgoraEng,
  setAppId,
  setUserRouteData,
  setWhoosh,
  setConnectionData,
  setKundaliId,
  setkundaliLoading,
} = authSlice.actions;

export default authSlice.reducer;
