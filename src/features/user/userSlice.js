import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fonction utilitaire pour récupérer le token
const getAuthToken = () => {
    return localStorage.getItem("token");
};

// Thunk pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const authToken = getAuthToken();

            if (!authToken) {
                return rejectWithValue("Aucun jeton d'authentification trouvé");
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

            if (response.status === 200) {
                return response.data.body;
            } else {
                return rejectWithValue("Le profil utilisateur est introuvable");
            }
        } catch (error) {
            const message = error.response?.data?.message || "Erreur inconnue";
            return rejectWithValue(message);
        }
    }
);

// Thunk pour mettre à jour le profil utilisateur
export const updateUserProfile = createAsyncThunk(
    "user/updateUserProfile",
    async ({ userName }, { rejectWithValue }) => {
        // Vérification que userName n'est pas vide
        if (!userName || userName.trim() === "") {
            return rejectWithValue(
                "Le nom d'utilisateur ne peut pas être vide !"
            );
        }

        try {
            const authToken = getAuthToken();

            if (!authToken) {
                return rejectWithValue("Aucun jeton d'authentification trouvé");
            }

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

            if (response.status === 200) {
                return response.data.body;
            } else {
                return rejectWithValue("La mise à jour du profil a échoué");
            }
        } catch (error) {
            const message = error.response?.data?.message || "Erreur inconnue";
            return rejectWithValue(message);
        }
    }
);

// Slice utilisateur
const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        userName: localStorage.getItem("userName") || "",
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
                state.error =
                    action.payload || "Erreur de chargement du profil";
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
                state.error =
                    action.payload || "Erreur de mise à jour du profil";
            });
    },
});

export default userSlice.reducer;
