import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const  detailsSection = () => {

  const { control } = useFormContext();
  //useFormContext is a hook that provides access to the form context.
  //This allows child components to interact with the form state without needing to pass down props explicitly.

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Details</h2>
        <FormDescription>
          Enter the details about your restaurant.
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="restaurantName"
        // function that takes field as an argument. field contains methods and properties to manage the input element.
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-4">
        <FormField
          control={control}
          name="city"
          // function that takes field as an argument. field contains methods and properties to manage the input element.
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="country"
          // function that takes field as an argument. field contains methods and properties to manage the input element.
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="deliveryPrice"
        // function that takes field as an argument. field contains methods and properties to manage the input element.
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>Delivery Price ($)</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="3.50" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="estimatedDeliveryTime"
        // function that takes field as an argument. field contains methods and properties to manage the input element.
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="30" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default detailsSection;