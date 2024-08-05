import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: null, firstname: null, lastname: null, job: null, business: null, city: null, e_mail: null },
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
    },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;