import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHabit, markCompleted } from "../redux/habitSlice";
const HomePage = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habit.habits);

  const [newHabit, setNewHabit] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleAddHabit = () => {
    if (newHabit && startDate) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 9); // 10 gün sürecek bir challenge
      dispatch(
        addHabit({
          name: newHabit,
          startDate: new Date(startDate),
          endDate,
          completion: 0,
        })
      );
      setNewHabit("");
      setStartDate("");
    } else {
      alert("Habit ve baslangic tarihi bos olamaz");
    }
  };

  const handleMarkCompleted = (habitIndex, completion) => {
    dispatch(markCompleted({ habitIndex, completion }));
  };

  return (
    <div>
      <div>
        <h1>Habit Tracker</h1>
        <label>
          Habit:
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
        </label>
        <label>
          Başlangıç Tarihi:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <button onClick={handleAddHabit}>Add Habit</button>

        <ul>
          {habits.map((habit, index) => (
            <li key={index}>
              <strong>{habit.name}</strong> - {habit.completion}% complete
              <br />
              <small>
                Başlangıç Tarihi: {habit.startDate.toDateString()} - Bitiş
                Tarihi: {habit.endDate.toDateString()}
              </small>
              <br />
              <input
                type="range"
                value={habit.completion}
                onChange={(e) =>
                  handleMarkCompleted(index, parseInt(e.target.value, 10))
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
