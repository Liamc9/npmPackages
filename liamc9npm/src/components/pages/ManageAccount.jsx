import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronLeftIcon, UserIcon2 } from '../Branding/icons/Icons';
import EditStackedList from '../molecules/stackedlist/EditStackedList';

// Styled Components
const Container = styled.div`
  max-width: 28rem; /* Equivalent to max-w-md */
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #000;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 0.5rem;

  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem; /* Equivalent to text-xl */
  font-weight: 600; /* Equivalent to font-semibold */
  color: #333; /* Equivalent to text-gray-800 */
  margin: 0;
`;

const DeleteButton = styled.button`
  width: 100%;
  background-color: #ef4444; /* Equivalent to bg-red-500 */
  color: white;
  padding: 0.75rem; /* Equivalent to py-3 */
  border-radius: 0.375rem; /* Equivalent to rounded-md */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Equivalent to shadow-md */
  border: none;
  cursor: not-allowed;
  margin-top: 1.5rem; /* Equivalent to mt-6 */

  &:hover {
    background-color: #dc2626; /* Equivalent to hover:bg-red-600 */
  }
`;

const ManageAccount = () => {
  const [email, setEmail] = useState('user@example.com');
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);

  const accountItems = [
    {
      type: 'EditableTextField',
      props: {
        icon: UserIcon2,
        name: 'Email Address',
        value: email,
        onUpdate: setEmail,
      },
    },
    {
      type: 'SelectField',
      props: {
        icon: UserIcon2,
        name: 'Language',
        value: language,
        options: ['English', 'Spanish', 'French'],
        onChange: setLanguage,
      },
    },
    {
      type: 'ToggleField',
      props: {
        icon: UserIcon2,
        name: 'Enable Notifications',
        value: notifications,
        onChange: setNotifications,
      },
    },
  ];

  const handleDeleteAccount = () => {
    console.log('Delete account clicked');
  };

  const handleBack = () => {
    console.log('Back button clicked');
    // Add navigation logic here (e.g., React Router's useNavigate or history.goBack())
  };

  return (
    <Container>
      {/* Header with Back Button and Title */}
      <Header>
        <BackButton onClick={handleBack}>
          <ChevronLeftIcon className="w-6 h-6" />
        </BackButton>
        <Title>Manage Account</Title>
      </Header>

      {/* Edit List */}
      <EditStackedList items={accountItems} />

      {/* Delete Button */}
      <DeleteButton onClick={handleDeleteAccount} disabled>
        Delete Account
      </DeleteButton>
    </Container>
  );
};

export default ManageAccount;
