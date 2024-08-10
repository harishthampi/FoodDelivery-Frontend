import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getRestaurant = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
            method: "GET",
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if(!response.ok){
            throw new Error("Failed to fetch restaurants!");
        }
        return response.json();
    }

    const { data: restaurant, isLoading } = useQuery("fetchRestaurants", getRestaurant);

    return { restaurant, isLoading };
}

export const useCreateMyRestaurant = () => {
    const{getAccessTokenSilently} = useAuth0();

    const createRestaurantRequest = async (
        restaurantFormData: FormData
    ):Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/restaurant`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`,
            },
            body:restaurantFormData,
        });

        if(!response.ok){
            throw new Error("Failed to create restaurant");
        }

        return response.json();
    };

    const { mutate: createRestaurant, isLoading } = useMutation(createRestaurantRequest, {
        onSuccess: () => {
            toast.success("Restaurant created successfully");
        },
        onError: () => {
            toast.error("Failed to create restaurant");
        },
    });

    return{createRestaurant,isLoading};
}

export const useUpdateMyRestaurant = () =>{
    const {getAccessTokenSilently} = useAuth0();

    const updateRestaurantRequest = async (restaurantFormData:FormData):Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/restaurant`,{
            method:"PUT",
            headers:{
                Authorization:`Bearer ${accessToken}`,
            },
            body:restaurantFormData,
        });

        if(!response.ok){
            throw new Error("Failed to update restaurant");
        }

        return response.json();
    }

    const{mutate:updateRestaurant,isLoading,error,isSuccess} = useMutation(updateRestaurantRequest);

    if(isSuccess){
        toast.success("Restaurant updated successfully");
    }
    if(error){
        toast.error("Failed to update restaurant");
    }

    return {updateRestaurant,isLoading};
}
