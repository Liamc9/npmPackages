// EditStackedList.jsx
import React from "react";
import styled from "styled-components";
import EditableTextField from "../../atoms/menuitem/EditableTextField";
import SelectField from "../../atoms/menuitem/SelectField";
import ToggleField from "../../atoms/menuitem/ToggleField";

const CategoryWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ItemsContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  overflow: hidden;
  & > *:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`;

const ListItem = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  &:last-child {
    border-bottom: none;
  }
`;

const EditStackedList = ({ title, items, updateState, toggleColor }) => {
  const renderComponent = (item, index) => {
    const { type, props } = item;
    
    // Always call updateState to keep the list in sync,
    // and also call the user-provided onChange if it exists.
    const handleChange = (newValue) => {
      if (props.onChange) {
        props.onChange(newValue);  // user-provided callback
      }
      updateState(props.fieldName, newValue); // keep local state updated
    };

    const childProps = {
      ...props,
      onChange: handleChange,
    };

    switch (type) {
      case "EditableTextField":
        return <EditableTextField key={index} {...childProps} />;
      case "SelectField":
        return <SelectField key={index} {...childProps} />;
      case "ToggleField":
        return <ToggleField key={index} {...childProps} activeColor={toggleColor}/>;
      default:
        return null;
    }
  };

  return (
    <CategoryWrapper>
      {title && <CategoryTitle>{title}</CategoryTitle>}
      <ItemsContainer>
        {items.map((item, index) => (
          <ListItem key={index}>{renderComponent(item, index)}</ListItem>
        ))}
      </ItemsContainer>
    </CategoryWrapper>
  );
};

export default EditStackedList;
