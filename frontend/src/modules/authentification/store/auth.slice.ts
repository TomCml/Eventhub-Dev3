import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Dependencies } from '../../store/dependencies';


interface AuthState {
    token: string | null;
    isLoading: boolean;
    error: string | null;
    // OTP state
    otpRequired: boolean;
    tempToken: string | null;
}

interface LoginResponse {
    token: string;
    otpRequired?: boolean;
    tempToken?: string;
    user: {
        id: string;
        username: string;
        email: string;
        createdAt: string;
    };
}

interface RegisterResponse {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
        createdAt: string;
    };
}

const initialState: AuthState = {
    token: null,
    isLoading: false,
    error: null,
    otpRequired: false,
    tempToken: null,
};

// Login thunk
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

// Register thunk
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

// OTP login verification thunk
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

// Backup code verification thunk
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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.otpRequired = false;
            state.tempToken = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        hydrateAuth: (state) => {
            state.isLoading = false;
            state.error = null;
            // Since we use cookies, we don't necessarily need the token in state, 
            // but we can set a dummy one or a boolean for 'isAuthenticated'
            state.token = "authenticated"; 
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.otpRequired) {
                    state.otpRequired = true;
                    state.tempToken = action.payload.tempToken || null;
                } else {
                    state.token = "authenticated";
                    state.otpRequired = false;
                    state.tempToken = null;
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || action.error.message || "Erreur inconnue";
            })
            // Register
            .addCase(registerUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.token = null; // No auto-login on register as requested
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || action.error.message || "Erreur inconnue";
            })
            // OTP Login Verification
            .addCase(verifyOtpLogin.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(verifyOtpLogin.fulfilled, (state) => {
                state.isLoading = false;
                state.token = "authenticated";
                state.otpRequired = false;
                state.tempToken = null;
            })
            .addCase(verifyOtpLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || action.error.message || "Code OTP invalide";
            })
            // Backup Code Verification
            .addCase(verifyBackupCode.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(verifyBackupCode.fulfilled, (state) => {
                state.isLoading = false;
                state.token = "authenticated";
                state.otpRequired = false;
                state.tempToken = null;
            })
            .addCase(verifyBackupCode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || action.error.message || "Code de secours invalide";
            });
    }
});

export const { logout, clearError, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;