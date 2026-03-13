import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Dependencies } from '../../store/dependencies';


interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    otpRequired: boolean;
    tempToken: string | null;
}

import type { LoginResponse, RegisterResponse } from '../domain/models';

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
    otpRequired: false,
    tempToken: null,
};


export const loginUser = createAsyncThunk<LoginResponse, { email: string; password: string }, { extra: Dependencies }>(
    'auth/login',
    async (payload, { extra, rejectWithValue }) => {
        try {
            return await extra.authGateway.login(payload.email, payload.password);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || error.message || 'Identifiants invalides');
        }
    }
);


export const registerUser = createAsyncThunk<RegisterResponse, { username: string; email: string; password: string }, { extra: Dependencies }>(
    'auth/register',
    async (payload, { extra, rejectWithValue }) => {
        try {
            return await extra.authGateway.register(payload);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || error.message || "Erreur lors de l'inscription");
        }
    }
);


export const verifyOtpLogin = createAsyncThunk<LoginResponse, { tempToken: string; otpToken: string }, { extra: Dependencies }>(
    'auth/verifyOtpLogin',
    async (payload, { extra, rejectWithValue }) => {
        try {
            return await extra.authGateway.verifyOtpLogin(payload.tempToken, payload.otpToken);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || error.message || 'Code OTP invalide');
        }
    }
);


export const verifyBackupCode = createAsyncThunk<LoginResponse, { tempToken: string; backupCode: string }, { extra: Dependencies }>(
    'auth/verifyBackupCode',
    async (payload, { extra, rejectWithValue }) => {
        try {
            return await extra.authGateway.verifyBackupCode(payload.tempToken, payload.backupCode);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || error.message || 'Code de secours invalide');
        }
    }
);


export const logoutUser = createAsyncThunk<void, void, { extra: Dependencies }>(
    'auth/logout',
    async (_, { extra, rejectWithValue }) => {
        try {
            await extra.authGateway.logout();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || error.message || 'Erreur lors de la déconnexion');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.otpRequired = false;
            state.tempToken = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        hydrateAuth: (state) => {
            state.isLoading = false;
            state.error = null;
            state.isAuthenticated = true;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.otpRequired) {
                    state.otpRequired = true;
                    state.tempToken = action.payload.tempToken || null;
                } else {
                    state.isAuthenticated = true;
                    state.otpRequired = false;
                    state.tempToken = null;
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || action.error.message || "Erreur inconnue";
            })

            .addCase(registerUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || action.error.message || "Erreur inconnue";
            })

            .addCase(verifyOtpLogin.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(verifyOtpLogin.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.otpRequired = false;
                state.tempToken = null;
            })
            .addCase(verifyOtpLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || action.error.message || "Code OTP invalide";
            })

            .addCase(verifyBackupCode.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(verifyBackupCode.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.otpRequired = false;
                state.tempToken = null;
            })
            .addCase(verifyBackupCode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || action.error.message || "Code de secours invalide";
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.otpRequired = false;
                state.tempToken = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state) => {

                state.isAuthenticated = false;
                state.otpRequired = false;
                state.tempToken = null;
            });
    }
});

export const { logout, clearError, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;