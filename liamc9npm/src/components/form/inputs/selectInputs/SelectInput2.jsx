// SelectInput2.jsx
import React from 'react';
import styled from 'styled-components';

// Styled Components
const SelectWrapper = styled.div`
      grid-column: ${(props) => props.gridSpan || 'auto'};
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
`;

const StyledSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #6200ee;
    outline: none;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

// SelectInput2 Component
const SelectInput2 = ({ label, options, ...props }) => {
  return (
    <SelectWrapper gridSpan={props.gridSpan}>
      {label && <StyledLabel htmlFor={props.id}>{label}</StyledLabel>}
      <StyledSelect {...props}>
        {options && options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectWrapper>
  );
};

export default SelectInput2;
