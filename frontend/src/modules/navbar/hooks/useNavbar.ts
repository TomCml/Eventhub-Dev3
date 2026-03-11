import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { AppState } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import { logoutUser } from '../../authentification/store/auth.slice';

export const useNavbar = () => {
    const { isAuthenticated } = useSelector((state: AppState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return {
        isAuthenticated,
        handleLogout
    };
};
