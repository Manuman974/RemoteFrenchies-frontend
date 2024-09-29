import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  value: {
    token: null,
    userId: null,
    firstname: null,
    lastname: null,
    job: null,
    business: null,
    city: null,
    e_mail: null,
    photos: [],
    profile_picture: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // Mettre à jour l'état avec les nouvelles données utilisateur
      state.value = { ...state.value, ...action.payload };
      // Sauvegarder les données de l'utilisateur dans AsyncStorage
      AsyncStorage.setItem('user', JSON.stringify(state.value)).catch(err => console.log(err));
    },
    loadUserData: (state, action) => {
      state.value = action.payload; // Charge les données utilisateur
    },
    addPhoto: (state, action) => {
      state.value.photos.push(action.payload);
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
      state.value = initialState.value; // Réinitialiser l'état utilisateur
    },
  },
});

export const { login, addPhoto, loadUserData, removePhoto, addPhotoProfile, logout } = userSlice.actions;
export default userSlice.reducer;
