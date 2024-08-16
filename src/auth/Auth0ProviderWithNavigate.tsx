import {  AppState, Auth0Provider} from "@auth0/auth0-react";
//Auth0Provider wraps your application and handles the authentication logic.
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}

const Auth0ProviderWithNavigate = ({ children }: Props) => { 
    //domain, clientId, and redirectUri are read from the environment variables. These should be defined in your .env file:

    const navigate = useNavigate();


    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri =import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    if (!domain || !clientId || !redirectUri || !audience) {
        //if any of the required environment variables are missing, it throws an error, preventing the app from continuing without proper authentication setup.
        throw new Error(
            "Unable to initialize auth"
        );
    }
    const onRedirectCallBack = (appState?:AppState) => { 
        //onRedirectCallBack function  runs after a successful login
        //AppState and User which help in typing the callback function.
        //Redirect the user to the /auth-callback route after a successful login. 
         navigate(appState?.returnTo || '/auth-callback');  //If the user was redirected to the login page from another page, they will be redirected back to that page after a successful login.  
    }
    return (
         //Auth0Provider is the context provider component that handles all the authentication logic for your app.
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: redirectUri,
            audience,
          }}
          onRedirectCallback={onRedirectCallBack}
        >
          {children}
        </Auth0Provider>
      );
    };


export default Auth0ProviderWithNavigate;
