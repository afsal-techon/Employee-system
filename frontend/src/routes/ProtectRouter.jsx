
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../Store/authStore';

const ProtectRouter = () => {
   
   const user = useAuthStore((state) => state.user);
   const isAuthentic = localStorage.getItem("token") !== null;
   return isAuthentic ? <Outlet/> : <Navigate to='/login' replace />
}

export default ProtectRouter

