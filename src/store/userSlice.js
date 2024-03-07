import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userData: null,
    status: true, // this is user login status after some time make it false
    loading: false,
    error: false,
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logoutUser: (state, action) => {
            state.status = false;
            state.userData = null
        },
        getUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getUserSuccess: (state) => {
            state.loading = false;
        },
        getUserFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload;
        }
    }
})


export const {
    loginUser,
    logoutUser,
    getUserStart,
    getUserSuccess,
    getUserFailure,
} = userSlice.actions; // inside the reducer all functions are actions

const userReducer = userSlice.reducer;

export default userReducer;