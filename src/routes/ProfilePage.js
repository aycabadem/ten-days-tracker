import React from "react";
import { useSelector } from "react-redux";
import MyDatePicker from "../components/DatePicker";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <div>{user?.username}</div>
      <MyDatePicker />
    </div>
  );
};

export default ProfilePage;
