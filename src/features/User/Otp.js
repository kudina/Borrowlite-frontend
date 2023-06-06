import { createSlice } from "@reduxjs/toolkit";

const otp = '';
export const otpSlice = createSlice({
    name: "user",
    initialState: {value: otp},

    reducers: {
        addOtp: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const  { addOtp } = otpSlice.actions;

export default otpSlice.reducer;


