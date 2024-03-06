import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js'

const store = configureStore();

export default store