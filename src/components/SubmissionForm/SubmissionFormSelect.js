import React, { useState } from "react";
import { array, func, string } from "prop-types";

import "./SubmissionFormSelect.scss";

const SubmissionFormSelect = ({
  labelText,
  options,
  selectOption,
  eliminated,
  colors,
  ...rest
}) => {
  const [selectedValue, setValue] = useState("");

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    const selectedOptionType = event.target.name;

    setValue(selectedOption);
    selectOption(selectedOptionType, selectedOption);
  };

  return (
    <label style={{ color: colors.primary }}>
      {labelText}
      <select
        onChange={(event) => handleChange(event)}
        value={selectedValue}
        style={{ border: `1px solid ${colors.primary}`, color: colors.primary }}
        {...rest}
      >
        <option value="">Choose a Queen</option>
        {options.map((name) => (
          <option
            key={`option_${name.split(" ").join("_")}`}
            // disabled={eliminated.includes(name)}
            value={name}
          >
            {`${eliminated.includes(name) ? "[X] " : ""}${name}`}
          </option>
        ))}
      </select>
    </label>
  );
};

SubmissionFormSelect.propTypes = {
  labelText: string,
  options: array,
  selectOption: func,
  type: string,
  eliminated: array,
};

export default SubmissionFormSelect;
