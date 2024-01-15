import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./HabitTable.css";
import CustomCheckbox from "./checkbox";

function createData(
  name,
  Day1,
  Day2,
  Day3,
  Day4,
  Day5,
  Day6,
  Day7,
  Day8,
  Day9,
  Day10
) {
  return { name, Day1, Day2, Day3, Day4, Day5, Day6, Day7, Day8, Day9, Day10 };
}

const rows = [];

export default function BasicTable() {
  const [habitName, setHabitName] = React.useState("");
  const [tableRows, setTableRows] = React.useState(rows);
  const [editingIndex, setEditingIndex] = React.useState(-1);
  const [editedHabitName, setEditedHabitName] = React.useState("");

  const handleAddHabit = () => {
    if (habitName.trim() === "") {
      return;
    }

    const newRow = createData(
      habitName,
      <CustomCheckbox />,
      <CustomCheckbox />,
      <CustomCheckbox />,
      <CustomCheckbox />,
      <CustomCheckbox />,
      <CustomCheckbox />,
      <CustomCheckbox />,
      <CustomCheckbox />,
      <CustomCheckbox />,
      <CustomCheckbox />
    );
    setTableRows((prevRows) => [...prevRows, newRow]);
    setHabitName("");
  };
  const handleEditHabit = (index) => {
    setEditingIndex(index);
    setEditedHabitName(tableRows[index].name);
  };

  const handleSaveEdit = (index) => {
    const updatedRows = [...tableRows];
    updatedRows[index].name = editedHabitName;
    setTableRows(updatedRows);
    setEditingIndex(-1);
    setEditedHabitName("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
    setEditedHabitName("");
  };
  const deleteHabit = (index) => {
    const updatedRows = [...tableRows];
    updatedRows.splice(index, 1);
    setTableRows(updatedRows);
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
                          <button onClick={() => deleteHabit(index)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="right">{row.Day1}</TableCell>
                  <TableCell align="right">{row.Day2}</TableCell>
                  <TableCell align="right">{row.Day3}</TableCell>

                  <TableCell align="right">{row.Day4}</TableCell>
                  <TableCell align="right">{row.Day5}</TableCell>
                  <TableCell align="right">{row.Day6}</TableCell>
                  <TableCell align="right">{row.Day7}</TableCell>
                  <TableCell align="right">{row.Day8}</TableCell>
                  <TableCell align="right">{row.Day9}</TableCell>
                  <TableCell align="right">{row.Day10}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}