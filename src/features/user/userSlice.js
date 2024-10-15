import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const authToken = localStorage.getItem("token");

            if (!authToken) {
                return rejectWithValue({
                    message: "Aucun jeton d'authentification trouvé",
                });
            }

            const response = await axios.get(
                "http://localhost:3001/api/v1/user/profile",
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data.body);
            if (response.status === 200) {
                return response.data.body;
            } else {
                return rejectWithValue({
                    message: "Le profil utilisateur est introuvable",
                });
            }
        } catch (error) {
            console.error(
                "Erreur lors de la récupération du profil utilisateur:",
                error
            );
            const message = error.response?.data?.message || "Erreur inconnue";
            return rejectWithValue({ message });
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "user/updateUserProfile",
    async ({ userName }, { rejectWithValue }) => {
        try {
            const authToken = localStorage.getItem("token");

            if (!authToken) {
                return rejectWithValue({
                    message: "Aucun jeton d'authentification trouvé",
                });
            }

            console.log("Données envoyées à l'API:", { userName });

            const response = await axios.put(
                "http://localhost:3001/api/v1/user/profile",
                { userName },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Réponse API après mise à jour:", response.data.body);

            if (response.status === 200) {
                return response.data.body;
            } else {
                return rejectWithValue({
                    message: "La mise à jour du profil a échoué",
                });
            }
        } catch (error) {
            const message = error.response?.data?.message || "Erreur inconnue";
            return rejectWithValue({ message });
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        userName: localStorage.getItem("userName"),
        firstName: "",
        lastName: "",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userName = action.payload.userName;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Erreur de chargement";
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userName = action.payload.userName;
                localStorage.setItem("userName", action.payload.userName);
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Erreur de chargement";
            });
    },
});

export default userSlice.reducer;
