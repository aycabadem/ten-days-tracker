import React, { useEffect, useState } from "react";
import { useSelector, dispatch } from "react-redux";
import "./ProfilePage.css";
import { db, auth } from "../firebase";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const habits = useSelector((state) => state.habits.userHabits);
  console.log(habits);

  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;

        const habitsCollection = db
          .collection("users")
          .doc(userId)
          .collection("habits");
        const habitsSnapshot = await habitsCollection.get();
        console.log(habitsSnapshot.docs);
        const habitsData = habitsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        //demem,eee
        //console.log(habitsData[0].startDate.toDate().getTime());
        //console.log(habitsData.length);
        //console.log(habitsData[3].startDate.toDate().getTime());

        //denemne
        const activeDates = db.collection("users").doc(userId);
        const activeDatesSnapshot = await activeDates.get();
        console.log(activeDatesSnapshot.data().activeDate.toDate());
        setSelectedDate(activeDatesSnapshot.data().activeDate.toDate());
        console.log(selectedDate);
        //denemeee
        //const habitsDataList = [];
        const habitDates = [];

        for (var i = 0; i < habitsData.length; i++) {
          if (
            !habitDates.some(
              // eslint-disable-next-line no-loop-func
              (date) =>
                date.getTime() === habitsData[i].startDate.toDate().getTime()
            )
          ) {
            habitDates.push(habitsData[i].startDate.toDate());
          } else {
            console.log("noliii");
          }
        }
        console.log(habitDates);

        setDates(habitDates);
        console.log(dates);
      }
    };

    fetchData();
  }, [habits]);

  // const dateElements = dates?.map((date) => (
  //   <p key={date.toISOString()}>{date.toDateString()}</p>
  // ));

  //creates date elements
  const dateElements = dates?.map((date) => (
    <p
      key={date.toISOString()}
      onClick={() => handleDateClick(date)}
      style={{ cursor: "pointer" }}
    >
      {date.toDateString()}
    </p>
  ));

  // date picker
  const handleDateClick = (clickedDate) => {
    setSelectedDate(clickedDate);

    console.log("clicked date:", clickedDate);
  };

  console.log(habits);

  const findHabitsByStartDate = (habits, selectedDate) => {
    return habits.filter((habit) => {
      const habitStartDate = new Date(habit.startDate.toDate());
      console.log(selectedDate.toDateString());
      console.log("start date :", habitStartDate.toDateString());
      if (habitStartDate && selectedDate) {
        return habitStartDate.toDateString() === selectedDate.toDateString();
      }
      return false;
    });
  };

  // find habits by start date
  const selectedHabits = findHabitsByStartDate(habits, selectedDate);
  console.log(selectedHabits);

  if (selectedHabits.length === 0) {
    return <p>no habits in this date</p>;
  }

  return (
    <div className="page-container">
      <div className="profile-div">{user?.username}</div>
      <div className="total-div">
        <div className="total-lower-div">
          <p>You create 2 10 days tracker</p>
        </div>
        <div className="total-lower-div">
          <p>complete 1 10 days tracker</p>
        </div>
        <div className="total-lower-div">
          <p>checked 450 times</p>
        </div>
        <div className="total-lower-div">
          <p>completion avarage %3.33</p>
        </div>
        <div className="total-lower-div">
          <div>perfect 10 days</div>
        </div>
      </div>
      <div className="tendays-div">
        <div className="tendays-upper">{dateElements}</div>
        <div className="tendays-lower">
          <div className="tendays-lower-div">
            {/* <p>add {habits.length} different habbits</p> */}
            {selectedHabits.map((habit, index) => (
              <div key={index}>
                <h3>{habit.name}</h3>
                {habit.startDate && (
                  <p>StartDate: {habit.startDate.toDate().toDateString()}</p>
                )}
              </div>
            ))}
          </div>
          <div className="tendays-lower-div">
            <p>complete 3 habits</p>
          </div>
          <div className="tendays-lower-div">
            <p>checked 45 times</p>
          </div>
          <div className="tendays-lower-div">
            add {selectedHabits.length} different habbits
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
