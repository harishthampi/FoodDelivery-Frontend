import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import UserProfileForm, { UserFormData } from "@/forms/user-profileForms/userProfileForm";
import { useGetUser } from "@/api/userApi";

type Props = {
    onCheckout : (userFormData :UserFormData) => void;
    disabled:boolean;
    isLoading:boolean;
}
const CheckoutButton = ({onCheckout,disabled,isLoading}:Props) => {
    const {isAuthenticated,isLoading:isAuthLoading,loginWithRedirect} = useAuth0();
    const {pathname} = useLocation();
    const {currentUser,isLoading:isGetUserLoading} = useGetUser();
    const onLogin = async () =>{
        await loginWithRedirect({
            appState:{
                returnTo:pathname,
            },
        });
    }
    if(!isAuthenticated){
        return <Button className="bg-orange-500 flex-1" onClick={onLogin}>Login to Checkout</Button>
    };
    if(isAuthLoading || !currentUser || isLoading){
        return <LoadingButton />
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
    {/* The DialogTrigger component is used to trigger the dialog. It is a wrapper component that accepts a single child element. The child element is the element that will trigger the dialog when clicked. */}
                <Button disabled={disabled} className="bg-orange-500 flex-1">Checkout</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <UserProfileForm onSave={onCheckout} currentUser={currentUser} isLoading={isGetUserLoading} title="Confirm Delivery Details" buttonText="Continue to Payment"/>
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutButton
