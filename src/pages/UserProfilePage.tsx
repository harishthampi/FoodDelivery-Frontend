import { useGetUser, useUpdateUser } from "@/api/userApi";
import UserProfileForm from "../forms/user-profileForms/userProfileForm";
//UserProfilePage component is responsible for rendering the UserProfileForm and managing the state related to updating a user profile
const UserProfilePage = () => {
  //uses the useGetUser hook to fetch the current user data when it mounts.
  //useUpdateUser hook is used to update the user data.
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();
  const { currentUser, isLoading: isGetLoading } = useGetUser();

  if (isGetLoading) {
    return <div>Loading...</div>;
  }
  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }
  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
