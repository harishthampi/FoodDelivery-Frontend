import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
    cuisine: string;
    field:ControllerRenderProps<FieldValues, "cuisines">;
}
const cuisineCheckBox = ({cuisine,field}:Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox className="bg-white" checked={field.value.includes(cuisine)} onCheckedChange={(checked) =>{
          if(checked){
            // checkbox is checked (checked is true), the current cuisine is added to the field.value array.
            field.onChange([...field.value,cuisine])
          }
          else{
            // checkbox is unchecked (checked is false), the current cuisine is removed from the field.value array.
            field.onChange(field.value.filter((value:string) => value !== cuisine))
          }
        }}/>
      </FormControl>
      <FormLabel className="text-sm font-normal text-gray-600">{cuisine} </FormLabel>
    </FormItem>
      
  )
}

export default cuisineCheckBox
