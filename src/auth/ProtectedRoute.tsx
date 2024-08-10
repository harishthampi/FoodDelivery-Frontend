import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

{/* When the user tries to access the protected route, the ProtectedRoute component checks if the user is authenticated.
If authenticated, it renders the requested route; otherwise, it redirects to the home page. */}

const ProtectedRoute = () => {
    const {isAuthenticated,isLoading} = useAuth0();
  if(isLoading){
    return null;
  }

  if(isAuthenticated){
    return <Outlet />;
  }

  return <Navigate to="/" replace/>

};

export default ProtectedRoute;
