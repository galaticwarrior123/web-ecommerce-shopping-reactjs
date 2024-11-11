import { Navigate, Outlet, useLocation } from "react-router-dom";



const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const role = localStorage.getItem('Role');
  
  return(
    role && allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} />
  )
};

export default RequireAuth;