import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import type { AppState } from '../../store/store';
import { generateOtpSecret, verifyAndActivateOtp, clearOtpSetup, clearOtpError, disableOtp } from '../store/user.slice';

export const useTwoFactor = (onClose: () => void) => {
    const dispatch = useAppDispatch();
    const { otpSetup, otpActivationResult, isOtpLoading, otpError } = useSelector(
        (state: AppState) => state.user
    );

    const [otpCode, setOtpCode] = useState('');

    const handleGenerate = () => {
        dispatch(generateOtpSecret());
    };

    const handleVerify = async () => {
        if (!otpCode) return;
        try {
            await dispatch(verifyAndActivateOtp(otpCode)).unwrap();
        } catch {
            // Error handled by Redux
        }
    };

    const handleDeactivate = async () => {
        try {
            await dispatch(disableOtp()).unwrap();
            onClose();
        } catch {
            // Error handled by Redux
        }
    };

    const handleOtpChange = (value: string) => {
        setOtpCode(value.replace(/\D/g, '').slice(0, 6));
    };

    const handleClose = () => {
        dispatch(clearOtpSetup());
        dispatch(clearOtpError());
        setOtpCode('');
        onClose();
    };

    return {
        otpSetup,
        otpActivationResult,
        isOtpLoading,
        otpError,
        otpCode,
        handleGenerate,
        handleVerify,
        handleDeactivate,
        handleOtpChange,
        handleClose
    };
};
