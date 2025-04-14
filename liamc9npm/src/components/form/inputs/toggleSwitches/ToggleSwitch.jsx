// ToggleSwitch.jsx
import React from 'react';
import styled from 'styled-components';

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleLabel = styled.label`
  margin-left: 8px;
  font-weight: 500;
`;

const ToggleInput = styled.input.attrs({ type: 'checkbox' })`
  /* Use the "size" prop (default to 50px if not provided) */
  width: ${(props) => (props.size ? `${props.size}px` : '50px')};
  height: ${(props) => (props.size ? `${props.size / 2}px` : '25px')};
  -webkit-appearance: none;
  background: ${(props) => props.inactiveColor || '#c6c6c6'};
  outline: none;
  border-radius: ${(props) => (props.size ? `${props.size / 2}px` : '25px')};
  position: relative;
  cursor: pointer;
  transition: background 0.3s;

  &:checked {
    background: ${(props) => props.activeColor || '#007bff'};
  }

  &:before {
    content: '';
    position: absolute;
    /* Knob size scales in proportion to the default (21px when size=50) */
    width: ${(props) => (props.size ? `${21 * (props.size / 50)}px` : '21px')};
    height: ${(props) => (props.size ? `${21 * (props.size / 50)}px` : '21px')};
    border-radius: 50%;
    /* Offset scales proportionally (default 2px) */
    top: ${(props) => (props.size ? `${2 * (props.size / 50)}px` : '2px')};
    left: ${(props) => (props.size ? `${2 * (props.size / 50)}px` : '2px')};
    background: white;
    transition: transform 0.3s;
  }

  &:checked:before {
    /* Translation distance scales proportionally (25px when size=50) */
    transform: translateX(${(props) =>
      props.size ? `${25 * (props.size / 50)}px` : '25px'});
  }

  &:disabled {
    background: #e9ecef;
    cursor: not-allowed;

    &:before {
      background: #ced4da;
    }
  }
`;

const ToggleSwitch = ({ ...props }) => (
  <ToggleWrapper>
    <ToggleInput {...props} />
    {props.label && <ToggleLabel htmlFor={props.id}>{props.label}</ToggleLabel>}
  </ToggleWrapper>
);

export default ToggleSwitch;
