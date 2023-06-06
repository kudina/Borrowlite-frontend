import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/User/Index'



export const store = configureStore({
    reducer: {
        user: userReducer,
    }
})