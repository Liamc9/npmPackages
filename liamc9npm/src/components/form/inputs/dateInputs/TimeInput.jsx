// TimeInput.jsx
import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
      grid-column: ${(props) => props.gridSpan || 'auto'};

  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const TimeInput = ({
  ...props
}) => (
  <InputWrapper className={props.className} gridSpan={props.gridSpan}>
    <Label htmlFor={props.name}>{props.label}</Label>
    <Input
      type="time"
      {...props} 
    />
  </InputWrapper>
);

export default TimeInput;
