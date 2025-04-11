// ToggleField.jsx
import React from "react";
import styled from "styled-components";
import ToggleSwitch from "../../form/inputs/toggleSwitches/ToggleSwitch";

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FieldName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #111827;
  margin-right: auto;
`;

const ToggleField = ({ name, value, onChange, activeColor, size, id, ...rest }) => {
  // Generate an id based on name if none is provided.
  const toggleId = id || `toggle-${name.replace(/\s+/g, "-").toLowerCase()}`;

  // Handle change event from ToggleSwitch; pass boolean to onChange.
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <FieldContainer>
      <FieldName>{name}</FieldName>
      <ToggleSwitch
        id={toggleId}
        checked={value}
        onChange={handleChange}
        activeColor={activeColor}
        size={size}
        {...rest}
      />
    </FieldContainer>
  );
};

export default ToggleField;
