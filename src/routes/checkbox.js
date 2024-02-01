import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const CustomCheckbox = ({ completed, onChange }) => {
  const [checked, setChecked] = useState(completed ? completed : false);
  console.log(checked);

  const handleChange = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  const uniqueKey = uuidv4();

  return (
    <Checkbox
      key={uniqueKey}
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
      style={{
        color: "#2a914e",
      }}
    />
  );
};
export default CustomCheckbox;
