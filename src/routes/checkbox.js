import React, {useState} from 'react'
import {Checkbox} from "@mui/material";

const CustomCheckbox = () => {
    const [checked, setChecked] = useState(false)

    function handleChange() {
        setChecked(!checked);
    }

    return (
        <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{"aria-label": "controlled"}}
            style ={{
                color: "#2a914e",
            }}
        />
    )
}
export default CustomCheckbox
