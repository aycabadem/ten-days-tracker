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
        const timestamp = userSnapshot.data()?.activeDate;
        const date = timestamp?.toDate(); // Convert to Date type
        console.log(date);
        dispatch(setDate(date));
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <p
        style={{
          color: "#76323F",
          fontWeight: "bold",
          fontSize: "16px",
          marginBottom: "5px",
        }}
      >
        Choose a start date:
      </p>
      <DatePicker
        wrapperClassName="datePicker"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText="Select a date"
      />
      {selectedDate && (
        <p
          style={{
            color: "#565656",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "5px",
          }}
        >
          Selected Date: {selectedDate.toDateString()}
        </p>
      )}
    </div>
  );
};

export default MyDatePicker;
