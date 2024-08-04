import { useCreateUser } from "@/api/userApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

//component that sends a request to the back end to create a user record after successful login.
const AuthCallBackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();//access the authenticated user's data.
  const { createUser } = useCreateUser();//hook to get the createUser function, which sends a request to the back end to create a new user.
  const hasCreateUser = useRef(false); 
  
  useEffect(() => {
    
    if (user?.sub && user?.email && !hasCreateUser.current) {
       createUser({ auth0Id: user.sub, email: user.email });
      hasCreateUser.current = true;
    }

    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallBackPage;
