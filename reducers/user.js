import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    firstname: null,
    lastname: null,
    job: null,
    business: null,
    city: null,
    e_mail: null,
    photos: [],
    // photos: "",
    profile_picture: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.job = action.payload.job;
      state.value.business = action.payload.business;
      state.value.city = action.payload.city;
      state.value.e_mail = action.payload.e_mail;
      state.value.profile_picture = action.payload.profile_picture;
    },
    addPhoto: (state, action) => {
      state.value.photos.push(action.payload);
      // state.value.photos = action.payload;
    },
    removePhoto: (state, action) => {
      state.value.photos = state.value.photos.filter(
        (data) => data !== action.payload
      );
    },
    addPhotoProfile: (state, action) => {
      state.value.profile_picture = action.payload;
    },
    logout: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { login, addPhoto, removePhoto, addPhotoProfile, logout } =
  userSlice.actions;
export default userSlice.reducer;
