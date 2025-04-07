import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

const PopoverContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerWrapper = styled.div`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`;

const Content = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 0.375rem; /* similar to Tailwind's rounded-md */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  width: 12rem; /* ~192px */
  z-index: 50;
  white-space: normal;

  ${({ placement }) => {
    switch (placement) {
      case 'top':
        return css`
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          margin-bottom: 8px;
        `;
      case 'left':
        return css`
          right: 100%;
          top: 50%;
          transform: translateX(-8px) translateY(-50%);
          margin-right: 8px;
        `;
      case 'right':
        return css`
          left: 100%;
          top: 50%;
          transform: translateX(8px) translateY(-50%);
          margin-left: 8px;
        `;
      case 'bottom':
      default:
        return css`
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          margin-top: 8px;
        `;
    }
  }}
`;

const Popover = ({
  trigger,
  children,
  placement = 'bottom',
  onOpen,
  onClose,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef();
  const triggerRef = useRef();

  const handleTogglePopover = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState && onOpen) onOpen();
      if (!newState && onClose) onClose();
      return newState;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <PopoverContainer {...props}>
      <TriggerWrapper ref={triggerRef} onClick={handleTogglePopover}>
        {trigger}
      </TriggerWrapper>
      {isOpen && (
        <Content ref={popoverRef} placement={placement}>
          {children}
        </Content>
      )}
    </PopoverContainer>
  );
};

export default Popover;
