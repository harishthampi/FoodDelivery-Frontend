import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/restaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/manageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const {orders} = useGetMyRestaurantOrders();
    //whenever the page loads, it will check if there is a restaurant or not
  const isEditing = !!restaurant;//if there is a restaurant -!!restaurant gives truthy value, then it is in edit mode
    //if there is no restaurant, then it is in create mode
  return (
    <Tabs>
      <TabsList defaultValue="orders">
        <TabsTrigger value="orders">Orders</TabsTrigger> 
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="space-y-5 bg-gray-50 pg-10 rounded-lg">
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => <OrderItemCard  order={order} />)}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm 
        restaurant={restaurant}
        onSave={isEditing ? updateRestaurant : createRestaurant}
        isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
        
    </Tabs>

  );
};

export default ManageRestaurantPage;
