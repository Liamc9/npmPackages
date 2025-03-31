import React from 'react';
import {EditSettingsTemplate} from 'liamc9npm'; // Adjust the import path as needed

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
      {
        name: 'Category',
        type: 'SelectField',
        fieldName: 'field2',
        options: ['Option 1', 'Option 2', 'Option 3'],
      },
      { name: 'Enable Feature', type: 'ToggleField', fieldName: 'toggleField' },
    ],
  },
  {
    title: 'Settings',
    fields: [
      { name: 'Full Name', type: 'EditableTextField', fieldName: 'name' },
      {
        name: 'Gender',
        type: 'SelectField',
        fieldName: 'gender',
        options: ['Male', 'Female'],
      },
      { name: 'Notifications', type: 'ToggleField', fieldName: 'notifications' },
    ],
  },
];

const ManageNotifications = () => {
  const handleSave = (formData) => {
    console.log('Saving form data:', formData);
    alert('Changes saved! (Simulated for Storybook)');
  };

  return (
    <EditSettingsTemplate
      headerTitle="Manage Notifications"
      sections={sections}
      initialValues={initialFormState}
      onSave={handleSave}
    />
  );
};

export default ManageNotifications;
