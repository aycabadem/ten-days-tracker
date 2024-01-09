import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);

  return <div>{user?.username}</div>;
};

export default ProfilePage;
