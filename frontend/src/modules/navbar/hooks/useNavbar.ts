import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { AppState } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import { logout } from '../../authentification/store/auth.slice';

export const useNavbar = () => {
    const { token } = useSelector((state: AppState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return {
        isAuthenticated: !!token,
        handleLogout
    };
};
