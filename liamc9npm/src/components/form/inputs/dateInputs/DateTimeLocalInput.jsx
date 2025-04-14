// DateTimeLocalInput.jsx
import React from 'react';
import styled from 'styled-components';

const DateTimeWrapper = styled.div`
      grid-column: ${(props) => props.gridSpan || 'auto'};

  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
`;

const DateTimeInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &:disabled {
    background-color: #e9ecef;
    cursor: not-allowed;
  }
`;

const DateTimeLocalInput = ({
  ...props
}) => (
  <DateTimeWrapper gridSpan={props.gridSpan} className={props.className}>
    <Label htmlFor={props.name}>{props.label}</Label>
    <DateTimeInput
      type="datetime-local"
      {...props}
    />
  </DateTimeWrapper>
);

export default DateTimeLocalInput;
