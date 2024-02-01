import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ProfilePage.css";
import { db, auth } from "../firebase";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const habits = useSelector((state) => state.habits.allHabits);
  console.log(habits);
  console.log(habits[0].Day1);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  console.log(dates);

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

        const activeDates = db.collection("users").doc(userId);
        const activeDatesSnapshot = await activeDates.get();
        console.log(activeDatesSnapshot.data().activeDate.toDate());
        setSelectedDate(activeDatesSnapshot.data().activeDate.toDate());
        console.log(selectedDate);

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
      console.log(selectedDate?.toDateString());
      console.log("start date :", habitStartDate.toDateString());
      if (habitStartDate && selectedDate) {
        return habitStartDate.toDateString() === selectedDate?.toDateString();
      }
      return false;
    });
  };

  // find habits by start date
  const selectedHabits = findHabitsByStartDate(habits, selectedDate);
  console.log(selectedHabits);

  // if (selectedHabits.length === 0) {
  //   return <p>no habits in this date</p>;
  // }

  //ikinci deneme  comp habit bulma
  const compHabits = [];
  let checksOneHabit = 0;
  let checksOneHabitFalse = 0;
  let count = 0;
  for (let i = 0; i < selectedHabits.length; i++) {
    for (let j = 1; j <= 10; j++) {
      if (selectedHabits[i][`Day${j}`] === false) {
        checksOneHabitFalse++;
      }
      if (selectedHabits[i][`Day${j}`] === true) {
        count++;
        checksOneHabit++;
      }
      if (count === 10) {
        compHabits.push(selectedHabits[i]);
      }
    }

    count = 0;
  }
  console.log(checksOneHabitFalse);
  console.log(checksOneHabit);
  console.log(count);
  console.log(compHabits);
  const tenDayAvarage = checksOneHabit / (checksOneHabit + checksOneHabitFalse);
  console.log(tenDayAvarage);
  const compHabitAll = [];
  let countAll = 0;
  let checksAll = 0;
  for (let i = 0; i < habits.length; i++) {
    for (let j = 1; j <= 10; j++) {
      if (habits[i][`Day${j}`] === true) {
        countAll++;
        checksAll++;
      }
      if (countAll === 10) {
        compHabitAll.push(habits[i]);
      }
    }

    countAll = 0;
  }
  console.log(checksAll);
  console.log(compHabitAll);
  return (
    <div className="page-container">
      <div className="profile-div">{user?.username}</div>
      <div className="total-div">
        <div className="total-lower-div">
          <p>You create {dates.length} 10 days tracker</p>
        </div>
        <div className="total-lower-div">
          <p>complete 1 ------ days tracker</p>
        </div>
        <div className="total-lower-div">
          <p>checked {checksAll} habit</p>
        </div>
        <div className="total-lower-div">
          <p>completion avarage %------</p>
        </div>
        <div className="total-lower-div">
          <div>perfect --??? 10 days</div>
        </div>
      </div>
      <div className="tendays-div">
        <div className="tendays-upper">{dateElements}</div>
        <div className="tendays-lower">
          <div className="tendays-lower-div">
            {/* <p>add {habits.length} different habbits</p> */}
            you add {selectedHabits.length} different habbits
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
            <p>complete {compHabits.length} habits</p>
          </div>
          <div className="tendays-lower-div">
            <p>checked {checksOneHabit} habit</p>
          </div>
          <div className="tendays-lower-div">
            10 Days Tracker Completion Avarage: %{tenDayAvarage * 100}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
