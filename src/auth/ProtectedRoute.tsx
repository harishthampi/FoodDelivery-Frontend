import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

{/* When the user tries to access the protected route, the ProtectedRoute component checks if the user is authenticated.
If authenticated, it renders the requested route; otherwise, it redirects to the home page. */}

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth0();

  return (
    isAuthenticated ? (<Outlet />) : (<Navigate to="/" replace/>)
  )
};

export default ProtectedRoute
