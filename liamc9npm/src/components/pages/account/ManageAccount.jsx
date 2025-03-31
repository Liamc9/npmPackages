import React, { useState } from 'react';
import styled from 'styled-components';
import { EditStackedList } from 'liamc9npm';
import { FiChevronLeft, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const initialAccountState = {
  email: 'user@example.com',
  language: 'English',
  notifications: true,
};

const accountFields = [
  { name: 'Email Address', type: 'EditableTextField', fieldName: 'email', icon: FiUser },
  { name: 'Language', type: 'SelectField', fieldName: 'language', options: ['English', 'Spanish', 'French'], icon: FiUser },
  { name: 'Enable Notifications', type: 'ToggleField', fieldName: 'notifications', icon: FiUser },
];

const Container = styled.div`
  padding: 20px;
  max-width: 28rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  margin-left: 40px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

const DeleteButton = styled.button`
  width: 100%;
  background-color: #ef4444;
  color: white;
  padding: 12px;
  border-radius: 6px;
  border: none;
  cursor: not-allowed;
  margin-top: 24px;
  opacity: 0.6;

  &:hover {
    background-color: #dc2626;
  }
`;

const ManageAccount = () => {
  const [accountData, setAccountData] = useState(initialAccountState);

  const updateState = (fieldName, value) => {
    setAccountData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleDeleteAccount = () => {
    console.log('Delete account clicked');
  };

  return (
    <Container>
      <Header>
        <Link to="/previous-page">
          <FiChevronLeft size={24} />
        </Link>
        <Title>Manage Account</Title>
      </Header>

      <main>
        <EditStackedList
          items={accountFields.map(({ name, type, fieldName, options, icon }) => ({
            type,
            props: {
              name,
              icon,
              fieldName,
              currentState: accountData[fieldName],
              options,
              value: accountData[fieldName],
              onUpdate: value => updateState(fieldName, value),
              onChange: value => updateState(fieldName, value),
            },
          }))}
        />
      </main>

      <DeleteButton disabled onClick={handleDeleteAccount}>
        Delete Account
      </DeleteButton>
    </Container>
  );
};

export default ManageAccount;