import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserRequest = async(): Promise<User> =>{

    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/user`,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${accessToken}`,
        "Content-Type":"application/json",
      },
    });

    if(!response.ok){
      throw new Error("Failed to fetch user");
    }

    return response.json();
  }

  const{data:currentUser,isLoading , error} = useQuery("fetchUser",getUserRequest);
  //useQuery function takes a query key ("fetchUser") and the getUserRequest function that fetches the user data from the backend.

  if(error){
    toast.error("Failed to fetch user");
  }

  return{
    currentUser,
    isLoading,
    error,
  };

}




type CreateUserRequest = {
  //TypeScript type defining the shape of the data that will be sent to create a user.
  auth0Id: string;
  email: string;
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0(); //allows you to obtain an access token for the authenticated user without requiring user interaction
  //useAuth0 hook provides access to the Auth0 SDK, which we can use to get the user's access token
  
  const createUserRequest = async (user: CreateUserRequest) => {
    //function that makes a POST request to the API to create a new user.

      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);
  // hook provided by React Query Package for performing mutations (create, update, delete operations).

  return {
    //useMutation returns several properties that we can use to interact.
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type UpdateUserRequest = {
  name:string;
  addressLine1:string;
  city:string;
  country:string;
};



export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserRequest = async (formData:UpdateUserRequest) =>{
    //function makes a PUT request to update the user data.
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/user`,{
      method:"PUT",
      headers:{
        Authorization:`Bearer ${accessToken}`,
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formData),
    })
    
    

    if(!response.ok){
      throw new Error(
        `Failed to update user: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  };

  const{
    //mutateAsync is being renamed to updateUser for clarity and ease of use.
    mutateAsync:updateUser,
    isLoading,
    error,
    isSuccess,
    reset,
  } = useMutation(updateUserRequest);
  //useMutation hook in React Query is used to handle data-altering operations (mutations) such as creating, updating, or deleting data.

  if(isSuccess){
    toast.success("User updated successfully");
  }

  if(error){
    toast.error("Failed to update user");
    reset();
  }

  return {
    //useMutation returns several properties that we can use to interact.
    updateUser,
    isLoading,
    error,
    isSuccess,
    reset,
  };

}