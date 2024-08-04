import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  //Initializes a new QueryClient instance with default options.
  defaultOptions: {
    queries:{
      //Set to false, meaning queries will not refetch data when the window is focused.
      refetchOnWindowFocus:false,
    }
  }
})
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        {/* Provides the QueryClient instance to the entire application, allowing components to use react-query for data fetching and state management */}
        <Auth0ProviderWithNavigate>
        {/* custom provider that wraps the application with Auth0 authentication logic. It likely handles the authentication flow and navigation based on the user's authentication state. */}
          <AppRoutes />
          <Toaster visibleToasts={1} position="top-right" richColors/>
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
