import React, { useState } from "react";
import styled, { css } from "styled-components";

// Tooltip container with relative positioning
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

// Base tooltip styles with dynamic positioning
const BaseTooltip = styled.div`
  position: absolute;
  padding: 5px;
  background-color: black;
  color: white;
  border-radius: 4px;
  text-align: center;
  opacity: 0.9;
  z-index: 10;
  width: 200px;
  white-space: nowrap;

  ${({ position }) => {
    switch (position) {
      case "bottom":
        return css`
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
        `;
      case "left":
        return css`
          right: 100%;
          top: 50%;
          transform: translateX(-10px) translateY(-50%);
        `;
      case "right":
        return css`
          left: 100%;
          top: 50%;
          transform: translateX(10px) translateY(-50%);
        `;
      case "top":
      default:
        return css`
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-10px);
        `;
    }
  }}
`;

// Default icon styling if no child is provided
const DefaultIcon = styled.span`
  display: flex;
  height: 1rem;
  width: 1rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #cbd5e0; /* Equivalent to Tailwind's bg-gray-400 */
  font-size: 0.75rem;
  color: white;
`;

const Tooltip = ({
  tooltipText,
  position = "top",
  children,
  tooltipStyle: customStyle = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipContainer
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children || <DefaultIcon>i</DefaultIcon>}
      {isVisible && (
        <BaseTooltip position={position} style={customStyle}>
          {tooltipText}
        </BaseTooltip>
      )}
    </TooltipContainer>
  );
};

export default Tooltip;
