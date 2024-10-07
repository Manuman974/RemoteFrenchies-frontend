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
    propositions: [], // Ajout du champ propositions
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

    updateProfile: (state, action) => {
      state.value = { ...state.value, ...action.payload };
      AsyncStorage.setItem('user', JSON.stringify(state.value)).catch(err => console.log(err));
    },

    logout: (state) => {
      state.value = initialState.value; // Réinitialiser l'état utilisateur
    },

    setPropositions: (state, action) => {
      state.value.propositions = action.payload;
      // Optionnel : sauvegarder dans AsyncStorage si nécessaire
      AsyncStorage.setItem('user', JSON.stringify(state.value)).catch(err => console.log(err));
    },
  },
});

export const { 
  login, 
  addPhoto, 
  loadUserData, 
  removePhoto, 
  addPhotoProfile, 
  logout, 
  updateProfile,
  setPropositions // N'oubliez pas d'exporter le nouveau reducer
} = userSlice.actions;

export default userSlice.reducer;
