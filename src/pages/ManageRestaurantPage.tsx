import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/restaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/manageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
    //whenever the page loads, it will check if there is a restaurant or not
  const isEditing = !!restaurant;//if there is a restaurant -!!restaurant gives truthy value, then it is in edit mode
    //if there is no restaurant, then it is in create mode
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
};

export default ManageRestaurantPage;
