import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../redux/habitSlice";
import { db, auth } from "../firebase";

const MyDatePicker = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.habits.selectedDate);
  const user = auth.currentUser;
  const handleDateChange = (date) => {
    console.log(date);
    dispatch(setDate(date));
    if (user) {
      const userId = user.uid;
      db.collection("users").doc(userId).set({ activeDate: date });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const userData = db.collection("users").doc(userId);
        const userSnapshot = await userData.get();
        console.log(userSnapshot.data());
        console.log(userId);
        const timestamp = userSnapshot.data().activeDate;
        const date = timestamp.toDate(); // Convert to Date type
        console.log(date);
        dispatch(setDate(date));
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <p>Choose a start date:</p>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText="Select a date"
      />
      {selectedDate && <p>Selected Date: {selectedDate.toString()}</p>}
    </div>
  );
};

export default MyDatePicker;
