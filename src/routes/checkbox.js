import React, { useState } from "react";
import { Checkbox } from "@mui/material";

const CustomCheckbox = ({ completed, onChange }) => {
  const [checked, setChecked] = useState(completed ? completed : false);

  const handleChange = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <Checkbox
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
