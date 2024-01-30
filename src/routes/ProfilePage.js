import React, { useEffect, useState } from "react";
import { useSelector, dispatch } from "react-redux";
import "./ProfilePage.css";
import { db, auth } from "../firebase";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const habits = useSelector((state) => state.habits.userHabits);
  console.log(habits);

  const [dates, setDates] = useState([]);

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
        //denemeee
        //const habitsDataList = [];
        const habitDates = [];

        for (var i = 0; i < habitsData.length; i++) {
          if (
            activeDatesSnapshot.data().activeDate &&
            activeDatesSnapshot.data().activeDate.toDate().getTime() !==
              habitsData[i].startDate.toDate().getTime()
          ) {
            habitDates.push(habitsData[i].startDate.toDate());
          } else {
            console.log("noliii");
          }
        }
        habitDates.push(activeDatesSnapshot.data().activeDate.toDate());
        console.log(habitDates);

        setDates(habitDates);
        console.log(dates);
      }
    };

    fetchData();
  }, []);

  const dateElements = dates.map((date) => (
    <p key={date.toISOString()}>{date.toDateString()}</p>
  ));

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
        <div className="tendays-upper">
          <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
          <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
          <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
          <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>

          <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>

          <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>

          <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>

          <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
        </div>
        <div className="tendays-lower">
          <div className="tendays-lower-div">
            {/* <p>add {habits.length} different habbits</p> */}
          </div>
          <div className="tendays-lower-div">
            <p>{dateElements}</p>
          </div>
          <div className="tendays-lower-div">
            <p>checked 45 times</p>
          </div>
          <div className="tendays-lower-div">
            {/* <p>name : {habits[0].name}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
