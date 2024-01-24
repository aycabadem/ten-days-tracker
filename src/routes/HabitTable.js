import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./HabitTable.css";
import CustomCheckbox from "./checkbox";
import {
  addHabit,
  editHabit,
  deleteHabit,
  markHabitComplete,
  setHabits,
} from "../redux/habitSlice";
import { useDispatch, useSelector } from "react-redux";
import { db, auth } from "../firebase";

export default function BasicTable() {
  const dispatch = useDispatch();
  const userHabits = useSelector((state) => state.habits.userHabits);
  const tableRows = userHabits;
  const [habitName, setHabitName] = useState("");
  //   const [tableRows, setTableRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedHabitName, setEditedHabitName] = useState("");

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
        const habitsData = habitsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(
          "Habits data from Firestore:",
          habitsSnapshot.docs[0].data().Day1
        );

        // setTableRows(habitsData);

        dispatch(setHabits(habitsData));
      }
    };

    fetchData();
  }, [dispatch, habitName]);

  const handleAddHabit = async () => {
    if (habitName.trim() === "") {
      return;
    }

    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const habitsCollection = db
        .collection("users")
        .doc(userId)
        .collection("habits");

      try {
        console.log("Adding habit to Firestore...");

        const newHabit = {
          name: habitName,
          Day1: false,
          Day2: false,
          Day3: false,
          Day4: false,
          Day5: false,
          Day6: false,
          Day7: false,
          Day8: false,
          Day9: false,
          Day10: false,
        };

        const docRef = await habitsCollection.add(newHabit);
        console.log(newHabit);

        dispatch(addHabit({ id: docRef.id, ...newHabit }));

        setHabitName("");
        console.log("Habit added successsfully");
      } catch (error) {
        console.error("Error adding habit to Firestore:", error);
      }
    }
  };

  const handleEditHabit = (index) => {
    setEditingIndex(index);
    setEditedHabitName(tableRows[index].name);
  };

  const handleSaveEdit = async (index) => {
    const habitToUpdate = userHabits[index];

    try {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const habitsCollection = db
          .collection("users")
          .doc(userId)
          .collection("habits");

        // Update the habit name in Firestore
        await habitsCollection.doc(habitToUpdate.id).update({
          name: editedHabitName,
        });

        // Update the habit name in the Redux store
        const newHabitData = { name: editedHabitName };
        dispatch(editHabit({ habitId: habitToUpdate.id, newHabitData }));

        // Fetch updated data from Firestore
        const habitsSnapshot = await habitsCollection.get();
        const updatedHabitsData = habitsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch(setHabits(updatedHabitsData));

        setEditingIndex(-1);
        setEditedHabitName("");
      }
    } catch (error) {
      console.error("Error updating habit in Firestore:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
    setEditedHabitName("");
  };

  const handleDelete = async (index) => {
    const habitToDelete = userHabits[index];

    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const habitsCollection = db
        .collection("users")
        .doc(userId)
        .collection("habits");

      try {
        await habitsCollection.doc(habitToDelete.id).delete();

        dispatch(deleteHabit(habitToDelete.id));

        console.log("Habit deleted successfully!");
      } catch (error) {
        console.error("Error deleting habit from Firestore:", error);
      }
    }
  };
  const handleCheckboxChange = async (docId, value, index) => {
    try {
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const habitsCollection = db
          .collection("users")
          .doc(userId)
          .collection("habits");

        await habitsCollection.doc(docId).update({
          [`Day${index}`]: value,
        });

        console.log(value);
      }
    } catch (error) {
      console.error("Error updating habit completion status:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="upper-div"></div>
      <div className="lower-div">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <input
                    type="text"
                    placeholder="Habit name"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                  />
                  <button onClick={handleAddHabit}>Add Habit</button>
                </TableCell>
                <TableCell align="right">Day1</TableCell>
                <TableCell align="right">Day2</TableCell>
                <TableCell align="right">Day3</TableCell>
                <TableCell align="right">Day4</TableCell>
                <TableCell align="right">Day5</TableCell>

                <TableCell align="right">Day6</TableCell>

                <TableCell align="right">Day7</TableCell>

                <TableCell align="right">Day8</TableCell>

                <TableCell align="right">Day9</TableCell>

                <TableCell align="right">Day10</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="habitTableCell">
                      {editingIndex === index ? (
                        <div>
                          <input
                            type="text"
                            value={editedHabitName}
                            onChange={(e) => setEditedHabitName(e.target.value)}
                          />
                          <button onClick={() => handleSaveEdit(index)}>
                            Save
                          </button>
                          <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                      ) : (
                        <div className="habitTableCell-lower">
                          <div className="row-name">{row.name}</div>
                          <button onClick={() => handleEditHabit(index)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(index)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <CustomCheckbox
                      completed={row.Day1}
                      onChange={(value) => {
                        handleCheckboxChange(row.id, value, 1);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CustomCheckbox
                      completed={row.Day2}
                      onChange={(value) => {
                        handleCheckboxChange(row.id, value, 2);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CustomCheckbox
                      completed={row.Day3}
                      onChange={(value) => {
                        handleCheckboxChange(row.id, value, 3);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CustomCheckbox
                      completed={row.Day4}
                      onChange={(value) => {
                        handleCheckboxChange(row.id, value, 4);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CustomCheckbox
                      completed={row.Day5}
                      onChange={(value) => {
                        handleCheckboxChange(row.id, value, 5);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CustomCheckbox
                      completed={row.Day6}
                      onChange={(value) => {
                        handleCheckboxChange(row.id, value, 6);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CustomCheckbox
                      completed={row.Day7}
                      onChange={(value) => {
                        handleCheckboxChange(row.id, value, 7);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CustomCheckbox
                      completed={row.Day8}
                      onChange={(value) => {
                        handleCheckboxChange(row.id, value, 8);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CustomCheckbox
                      completed={row.Day9}
                      onChange={(value) => {
                        handleCheckboxChange(row.id, value, 9);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CustomCheckbox
                      completed={row.Day10}
                      onChange={(value) => {
                        handleCheckboxChange(row.id, value, 10);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
