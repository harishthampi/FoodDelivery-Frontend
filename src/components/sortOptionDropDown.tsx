
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type Props = {
    onChange:(value:string) => void;
    sortOptions: string;
}

const SORT_OPTION = [
    {
        label:"Best Match",
        value:"best_match"
    },
    {
        label:"Delivery Price",
        value:"deliveryPrice"
    },
    {
        label:"Delivery Time",
        value:"estimatedDeliveryTime"
    }
]
const sortOptionDropDown = ({onChange,sortOptions}:Props) => {
    const selectedSortLabel = SORT_OPTION.find((option) => option.value === sortOptions)?.label || SORT_OPTION[0].label;
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
            <Button variant="outline" className="w-full">
                Sort by : {selectedSortLabel}
            </Button>
        </DropdownMenuTrigger>
       <DropdownMenuContent>
        {SORT_OPTION.map((option) => (
            <DropdownMenuItem className="cursor-pointer" onClick={() => onChange(option.value)}>
                {option.label}
            </DropdownMenuItem>
        ))}
       </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default sortOptionDropDown
