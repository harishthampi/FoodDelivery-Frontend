import { useAuth0 } from "@auth0/auth0-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";


const UserNameMenu = () => {
    const{user,logout} = useAuth0();
  return (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex item-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500"/>
        {user?.name}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="border border-gray-300 rounded-lg shadow-lg bg-white px-5 py-5 mt-2">
        <DropdownMenuItem>
           <Link to='/user-profile'  className="font-bold hover:text-orange-500">User Profile</Link>
        </DropdownMenuItem>
        <Separator className="mx-1"/>
        <DropdownMenuItem className="pl-1 mt-2">
           <Button className="flex flex-1 font-bold bg-orange-500" onClick={()=> logout()}>Logout</Button>
        </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)};

export default UserNameMenu;
