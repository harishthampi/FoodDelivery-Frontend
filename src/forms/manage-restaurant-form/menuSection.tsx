import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItemInput from "./MenuItemInput";


const MenuSection = () => {
    const { control } = useFormContext();

    const{fields,append,remove} = useFieldArray({
        //field array is used to manage the array of menu items
        control,
        name:"menuItems",
    });

  return (
    <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Menu</h2>
        </div>
        <FormDescription>
            Add the menu items that your restaurant serves.
        </FormDescription>
        <FormField control={control} name="menuItems" render={() => (
            <FormItem className="flex flex-col gap-2">
                {fields.map((field,index) =>(
                    <MenuItemInput key={field.id} index={index} removeMenuItem = {() => remove(index)}/>
                ))}
            </FormItem>  
        )}/>
        <Button type="button" onClick={() => append({name:"",price:0})}>Add Menu Item</Button>
  </div>  
)
}

export default MenuSection
