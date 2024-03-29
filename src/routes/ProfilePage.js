import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ProfilePage.css";
import { db, auth } from "../firebase";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const [userFirebase, setUserFirebase] = useState(null);
  const habits = useSelector((state) => state.habits.allHabits);
  const [habitsFirebase, setHabitsFirebase] = useState([]);
  console.log(habits);
  //console.log(habits[0].Day1);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);
  console.log(dates);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        await user?.reload();
        const userId = user.uid;
        console.log(user);
        console.log(user?.displayName?.toUpperCase());
        setUserFirebase(user?.displayName?.toUpperCase());
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
        setHabitsFirebase(habitsData);
        console.log(habitsData);
        const activeDates = db.collection("users").doc(userId);
        const activeDatesSnapshot = await activeDates.get();
        //console.log(activeDatesSnapshot.data().activeDate.toDate());
        setSelectedDate(activeDatesSnapshot.data()?.activeDate?.toDate());
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
  }, [user, userFirebase]);

  // const dateElements = dates?.map((date) => (
  //   <p key={date.toISOString()}>{date.toDateString()}</p>
  // ));

  //creates date elements
  const dateElements = dates?.map((date) => (
    <div className="pnin" tabIndex={0} onClick={() => handleDateClick(date)}>
      <p
        className="dateElement"
        key={date.toISOString()}
        style={{ cursor: "pointer" }}
      >
        {date.toDateString()}
      </p>
    </div>
  ));

  // date picker
  const handleDateClick = (clickedDate) => {
    setSelectedDate(clickedDate);

    console.log("clicked date:", clickedDate);
  };

  console.log(habits);

  const findHabitsByStartDate = (habitsFirebase, selectedDate) => {
    return habitsFirebase.filter((habit) => {
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
  const selectedHabits = findHabitsByStartDate(habitsFirebase, selectedDate);
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
  const tenDayAvarage = parseFloat(
    (checksOneHabit / (checksOneHabit + checksOneHabitFalse)) * 100
  ).toFixed(1);
  console.log(tenDayAvarage);
  const compHabitAll = [];

  let countAll = 0;
  let checksAll = 0;
  for (let i = 0; i < habitsFirebase.length; i++) {
    for (let j = 1; j <= 10; j++) {
      if (habitsFirebase[i][`Day${j}`] === true) {
        countAll++;
        checksAll++;
      }
      if (countAll === 10) {
        compHabitAll.push(habitsFirebase[i]);
      }
    }

    countAll = 0;
  }
  console.log(checksAll);
  //OLMADIiiiiiiiiiiiiiiii
  console.log(compHabitAll.length);
  let compAvarageTotal = 0;
  let countTotalTrue = 0;
  let countTotalFalse = 0;
  for (let i = 0; i < dates.length; i++) {
    const filteredHabits = findHabitsByStartDate(habitsFirebase, dates[i]);
    console.log(dates.length);
    let isPerfect = true;
    for (let k = 0; k < filteredHabits.length; k++) {
      for (let j = 1; j <= 10; j++) {
        if (filteredHabits[k][`Day${j}`] === true) {
          countTotalTrue++;
        } else {
          countTotalFalse++;
          isPerfect = false;
        }
      }
    }
    if (isPerfect) {
      compAvarageTotal++;
    }
  }
  console.log(countTotalTrue);
  console.log(countTotalFalse);
  console.log(compAvarageTotal);
  const totalAverageTenDays = parseFloat(
    (compAvarageTotal / dates.length) * 100
  ).toFixed(1);
  console.log(totalAverageTenDays);
  const allHabitsCompAvatage = parseFloat(
    (countTotalTrue / (countTotalTrue + countTotalFalse)) * 100
  ).toFixed(1);
  console.log(allHabitsCompAvatage);

  // let showDate = "";
  // if (selectedHabits !== undefined) {
  //   selectedHabits[0].startDate.toDate().toDateString();
  // }

  let showDate = "";
  if (selectedDate !== null) {
    showDate = selectedDate?.toDateString();
  }
  console.log(showDate);

  return (
    <div className="page-container-profile">
      <div className="profile-div">
        <p style={{ color: "#565656", fontWeight: "bold", fontSize: "24px" }}>
          {userFirebase}
        </p>
      </div>
      <div className="ustdiv">
        <p style={{ color: "#565656", fontWeight: "bold", fontSize: "20px" }}>
          Total
        </p>
      </div>
      <div className="total-div">
        <div className="total-lower-div">
          <p>
            You create<div className="simple">{dates.length}</div>10 days
            tracker
          </p>
        </div>
        <div className="total-lower-div">
          <p>
            Perfect<div className="simple">{compAvarageTotal}</div>10-Days
            Tracker
          </p>
        </div>
        <div className="total-lower-div">
          <p>
            Checked <div className="simple">{checksAll}</div>Habit
          </p>
        </div>
        <div className="total-lower-div">
          <p>
            10-Days Tracker Completion Average:
            <div className="simple">
              {" "}
              {isNaN(totalAverageTenDays) ? "0%" : `${totalAverageTenDays}%`}
            </div>
          </p>
        </div>
        <div className="total-lower-div">
          <p>
            All Habits Completion Average:
            <div className="simple">
              {isNaN(allHabitsCompAvatage) ? "0%" : `${allHabitsCompAvatage}%`}
            </div>
          </p>
        </div>
      </div>
      <div className="ustdiv">
        <p style={{ color: "#565656", fontWeight: "bold", fontSize: "20px" }}>
          {showDate ? showDate : "Pick the Starting Date"}
        </p>
      </div>
      <div className="tendays-div">
        <div className="tendays-upper">
          <div className="dates">
            <p
              style={{
                color: "#D7CEC7",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              {dateElements}
            </p>
          </div>
        </div>
        <div className="tendays-lower">
          <div className="tendays-lower-div">
            <p>
              Added <div className="simple">{selectedHabits.length}</div> Habbit
            </p>
          </div>
          <div className="tendays-lower-div">
            <p>
              Perfect<div className="simple">{compHabits.length}</div>Habit
            </p>
          </div>
          <div className="tendays-lower-div">
            <p>
              Checked <div className="simple">{checksOneHabit}</div>Habit
            </p>
          </div>
          <div className="tendays-lower-div">
            <p>
              Completion Average:
              <div className="simple">
                {isNaN(tenDayAvarage) ? "0%" : `${tenDayAvarage}%`}
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
