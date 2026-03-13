import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Dependencies } from '../../store/dependencies';
import type { UserProfile, OtpSetupData, OtpActivationResult } from '../domain/models';

interface UserState {
    profile: UserProfile | null;
    isLoading: boolean;
    error: string | null;
    otpSetup: OtpSetupData | null;
    otpActivationResult: OtpActivationResult | null;
    isOtpLoading: boolean;
    otpError: string | null;
}

const initialState: UserState = {
    profile: null,
    isLoading: false,
    error: null,
    otpSetup: null,
    otpActivationResult: null,
    isOtpLoading: false,
    otpError: null,
};

export const fetchProfile = createAsyncThunk<UserProfile, void, { extra: Dependencies }>(
    'user/fetchProfile',
    async (_, { extra, rejectWithValue }) => {
        try {
            return await extra.userGateway.getProfile();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || error.message || 'Erreur lors du chargement du profil');
        }
    }
);

export const generateOtpSecret = createAsyncThunk<OtpSetupData, void, { extra: Dependencies }>(
    'user/generateOtpSecret',
    async (_, { extra, rejectWithValue }) => {
        try {
            return await extra.userGateway.generateOtpSecret();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || error.message || 'Erreur lors de la génération OTP');
        }
    }
);

export const verifyAndActivateOtp = createAsyncThunk<OtpActivationResult, string, { extra: Dependencies }>(
    'user/verifyAndActivateOtp',
    async (otpToken, { extra, rejectWithValue }) => {
        try {
            return await extra.userGateway.verifyAndActivateOtp(otpToken);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || error.message || 'Code OTP invalide');
        }
    }
);

export const disableOtp = createAsyncThunk<any, void, { extra: Dependencies }>(
    'user/disableOtp',
    async (_, { extra, rejectWithValue }) => {
        try {
            return await extra.userGateway.disableOtp();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error?.message || error.message || 'Erreur lors de la désactivation');
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearProfile: (state) => {
            state.profile = null;
        },
        clearOtpSetup: (state) => {
            state.otpSetup = null;
            state.otpActivationResult = null;
            state.otpError = null;
        },
        clearOtpError: (state) => {
            state.otpError = null;
        },
        hydrateProfile: (state, action: PayloadAction<UserProfile>) => {
            state.profile = action.payload;
            state.isLoading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || action.error.message || "Erreur lors du chargement du profil";
            })
            .addCase(generateOtpSecret.pending, (state) => {
                state.isOtpLoading = true;
                state.otpError = null;
            })
            .addCase(generateOtpSecret.fulfilled, (state, action) => {
                state.isOtpLoading = false;
                state.otpSetup = action.payload;
            })
            .addCase(generateOtpSecret.rejected, (state, action) => {
                state.isOtpLoading = false;
                state.otpError = (action.payload as string) || action.error.message || "Erreur OTP";
            })
            .addCase(verifyAndActivateOtp.pending, (state) => {
                state.isOtpLoading = true;
                state.otpError = null;
            })
            .addCase(verifyAndActivateOtp.fulfilled, (state, action) => {
                state.isOtpLoading = false;
                state.otpActivationResult = action.payload;
                if (state.profile) {
                    state.profile.otp_enable = 1;
                }
            })
            .addCase(verifyAndActivateOtp.rejected, (state, action) => {
                state.isOtpLoading = false;
                state.otpError = (action.payload as string) || action.error.message || "Code OTP invalide";
            })
            .addCase(disableOtp.pending, (state) => {
                state.isOtpLoading = true;
                state.otpError = null;
            })
            .addCase(disableOtp.fulfilled, (state) => {
                state.isOtpLoading = false;
                if (state.profile) {
                    state.profile.otp_enable = 0;
                }
                state.otpSetup = null;
                state.otpActivationResult = null;
            })
            .addCase(disableOtp.rejected, (state, action) => {
                state.isOtpLoading = false;
                state.otpError = (action.payload as string) || action.error.message || "Erreur lors de la désactivation";
            });
    }
});

export const { clearProfile, clearOtpSetup, clearOtpError, hydrateProfile } = userSlice.actions;
export default userSlice.reducer;
