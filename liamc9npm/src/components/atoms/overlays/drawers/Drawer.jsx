// src/components/Drawers/Drawer.jsx

import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

const DrawerContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  justify-content: ${({ side }) =>
    side === "left" ? "flex-start" : "flex-end"};
  align-items: stretch;
  transition: opacity ${({ transitionDuration }) => transitionDuration}ms ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity ${({ transitionDuration }) => transitionDuration}ms ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
`;

const DrawerStyle = styled.div`
  width: ${({ width }) => width || "80%"};
  max-width: ${({ maxWidth }) => maxWidth || "400px"};
  height: ${({ height }) => height || "100%"};
  max-height: ${({ maxHeight }) => maxHeight || "100%"};
  background-color: white;
  ${({ noRoundedCorners, side }) =>
    noRoundedCorners
      ? css`
          border-radius: 0;
        `
      : side === "left"
      ? css`
          border-radius: 0 16px 16px 0;
        `
      : css`
          border-radius: 16px 0 0 16px;
        `}
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform: ${({ isOpen, side }) =>
    isOpen ? "translateX(0)" : side === "left" ? "translateX(-100%)" : "translateX(100%)"};
  transition: transform ${({ transitionDuration }) => transitionDuration}ms ease-in-out,
    opacity ${({ transitionDuration }) => transitionDuration}ms ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  display: flex;
  flex-direction: column;
`;

const DrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Drawer = ({
  isOpen,
  onClose,
  children,
  side = "left", // "left" or "right"
  transitionDuration = 300,
  width,
  height,
  maxWidth,
  maxHeight,
  noRoundedCorners = false,
}) => {
  const drawerRef = useRef();

  // Close the drawer when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return createPortal(
    <DrawerContainer
      isOpen={isOpen}
      transitionDuration={transitionDuration}
      side={side}
    >
      {/* Background overlay */}
      <BackgroundOverlay
        isOpen={isOpen}
        onClick={onClose}
        transitionDuration={transitionDuration}
      />

      {/* Drawer content */}
      <DrawerStyle
        ref={drawerRef}
        isOpen={isOpen}
        transitionDuration={transitionDuration}
        width={width}
        height={height}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        noRoundedCorners={noRoundedCorners}
        side={side}
      >
        <DrawerContent>{children}</DrawerContent>
      </DrawerStyle>
    </DrawerContainer>,
    document.body
  );
};

export default Drawer;
