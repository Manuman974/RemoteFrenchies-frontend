import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, firstname: null, lastname: null, job: null, business: null, city: null, e_mail: null, photos: [] },
};

export const userSlice = createSlice({
    name: 'user',
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
        },
        addPhoto: (state, action) => {
            state.value.photos.push(action.payload);
        },
        removePhoto: (state, action) => {
            state.value.photos = state.value.photos.filter((data) => data !== action.payload);
        },
    },
});

export const { login, addPhoto, removePhoto, updatePhoto } = userSlice.actions;
export default userSlice.reducer;