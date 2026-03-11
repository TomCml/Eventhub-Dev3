import type { UserProfile } from "../store/user.slice";

export interface UserGateway {
    getProfile(): Promise<UserProfile>;
    generateOtpSecret(): Promise<any>;
    verifyAndActivateOtp(otpToken: string): Promise<any>;
    disableOtp(): Promise<any>;
}
