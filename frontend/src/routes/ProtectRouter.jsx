
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRouter = () => {
   const isAuthentic = localStorage.getItem("token") !== null;
   return isAuthentic ? <Outlet/> : <Navigate to='/login' replace />
}

export default ProtectRouter

