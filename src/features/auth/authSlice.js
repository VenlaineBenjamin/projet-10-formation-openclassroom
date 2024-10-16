import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/v1/user/login",
                { email, password }
            );
            const { token, ...userData } = response.data.body;
            console.log("Réponse de l'API:", token);
            localStorage.setItem("token", token);
            return { token, userData };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        userInfo: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,
        error: null,
        token: localStorage.getItem("token") || null,
    },
    reducers: {
        logoutUser: (state) => {
            state.userInfo = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userName");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.userData;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(action.payload.userData)
                );
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
