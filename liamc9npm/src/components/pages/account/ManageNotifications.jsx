import React, { useState } from 'react';
import styled from 'styled-components';
import { EditStackedList } from 'liamc9npm';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const initialFormState = {
  field1: 'Initial Value 1',
  field2: 'Initial Value 2',
  name: 'John Doe',
  gender: 'Male',
  notifications: true,
  toggleField: false,
};

const sections = [
  {
    title: 'Manage Notifications',
    fields: [
      { name: 'Name', type: 'EditableTextField', fieldName: 'field1' },
      { name: 'Category', type: 'SelectField', fieldName: 'field2', options: ['Option 1', 'Option 2', 'Option 3'] },
      { name: 'Enable Feature', type: 'ToggleField', fieldName: 'toggleField' },
    ],
  },
  {
    title: 'Settings',
    fields: [
      { name: 'Full Name', type: 'EditableTextField', fieldName: 'name' },
      { name: 'Gender', type: 'SelectField', fieldName: 'gender', options: ['Male', 'Female'] },
      { name: 'Notifications', type: 'ToggleField', fieldName: 'notifications' },
    ],
  },
];

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  margin-left: 40px;
  font-size: 1.5rem;
`;

const Footer = styled.footer`
  margin-top: 24px;
`;

const SaveButton = styled.button`
  padding: 10px 16px;
  background-color: #3b82f6;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 1rem;

  &:hover {
    background-color: #2563eb;
  }
`;

const ManageNotifications = () => {
  const [formData, setFormData] = useState(initialFormState);

  const updateState = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const saveChanges = () => {
    console.log('Saving changes:', formData);
    alert('Changes saved! (Simulated for Storybook)');
  };

  return (
    <Container>
      <Header>
        <Link to="/previous-page">
          <FiChevronLeft size={24} />
        </Link>
        <Title>Manage Notifications</Title>
      </Header>

      <main>
        {sections.map(({ title, fields }, idx) => (
          <EditStackedList
            key={idx}
            title={title}
            items={fields.map(({ name, type, fieldName, options }) => ({
              type,
              props: {
                name,
                fieldName,
                currentState: formData[fieldName],
                options,
                value: formData[fieldName],
              },
            }))}
            updateState={updateState}
          />
        ))}
      </main>

      <Footer>
        <SaveButton onClick={saveChanges}>Save Changes</SaveButton>
      </Footer>
    </Container>
  );
};

export default ManageNotifications;