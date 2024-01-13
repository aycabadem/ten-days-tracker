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
    return {name, Day1, Day2, Day3, Day4, Day5, Day6, Day7, Day8, Day9, Day10};
}


const rows = [
    // createData(
    //     // "Frozen yoghurt",
    //     // <CustomCheckbox/>,
    //     // <CustomCheckbox/>,
    //     // <CustomCheckbox/>,
    //     // <CustomCheckbox/>,
    //     // <CustomCheckbox/>,
    //     // <CustomCheckbox/>,
    //     // <CustomCheckbox/>,
    //     // <CustomCheckbox/>,
    //     // <CustomCheckbox/>,
    // ),
    // createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    // createData("Eclair", 262, 16.0, 24, 6.0),
    // createData("Cupcake", 305, 3.7, 67, 4.3),
    // createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
    const [habitName, setHabitName] = React.useState("");
    const [tableRows, setTableRows] = React.useState(rows);
    const handleAddHabit = () => {
        if (habitName.trim() === "") {
            return;
        }

        const newRow = createData(habitName, <CustomCheckbox/>, <CustomCheckbox/>, <CustomCheckbox/>, <CustomCheckbox/>,
            <CustomCheckbox/>, <CustomCheckbox/>, <CustomCheckbox/>, <CustomCheckbox/>, <CustomCheckbox/>,
            <CustomCheckbox/>);
        setTableRows((prevRows) => [...prevRows, newRow]);
        setHabitName("");
    };
    const editHabit = (index) => {
        // Implement editing logic here
        // You may prompt the user for a new habit name or show an input field
        // and update the corresponding row in tableRows state
    };

    const deleteHabit = (index) => {
        const updatedRows = [...tableRows];
        updatedRows.splice(index, 1);
        setTableRows(updatedRows);
    };
    return (
        <div className="page-container">
            <div className="upper-div">

            </div>
            <div className="lower-div">
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
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
                                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                        <div>
                                            <button onClick={() => editHabit(index)}>Düzenle</button>
                                            <button onClick={() => deleteHabit(index)}>Sil</button>
                                        </div>
                                    </TableCell>
                                    <TableCell key={`${row.name}${index}0`} align="right">{row.Day1}</TableCell>
                                    <TableCell key={`${row.name}${index}1`} align="right">{row.Day2}</TableCell>
                                    <TableCell key={`${row.name}${index}2`} align="right">{row.Day3}</TableCell>
                                    <TableCell key={`${row.name}${index}3`} align="right">{row.Day4}</TableCell>

                                    <TableCell key={`${row.name}${index}5`} align="right">{row.Day5}</TableCell>
                                    <TableCell key={`${row.name}${index}6`} align="right">{row.Day6}</TableCell>
                                    <TableCell key={`${row.name}${index}7`} align="right">{row.Day7}</TableCell>
                                    <TableCell key={`${row.name}${index}8`} align="right">{row.Day8}</TableCell>
                                    <TableCell key={`${row.name}${index}9`} align="right">{row.Day9}</TableCell>
                                    <TableCell key={`${row.name}${index}10`} align="right">{row.Day10}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
