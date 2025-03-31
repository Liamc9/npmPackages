import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiLock } from 'react-icons/fi';
import {EditStackedList} from 'liamc9npm';

// Styled Components
const Container = styled.div`
  max-width: 28rem;
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
  margin-right: 0.5rem;

  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const SaveButton = styled.button`
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  margin-top: 1.5rem;

  &:hover {
    background-color: #1e40af;
  }
`;

const PrivacyAndSecurity = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [locationTracking, setLocationTracking] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [adPersonalization, setAdPersonalization] = useState(true);
  const [password, setPassword] = useState('');

  const privacySecurityItems = [
    {
      type: 'ToggleField',
      props: {
        icon: FiLock,
        name: 'Two-Factor Authentication',
        value: twoFactorAuth,
        onChange: setTwoFactorAuth,
      },
    },
    {
      type: 'ToggleField',
      props: {
        icon: FiLock,
        name: 'Allow Location Tracking',
        value: locationTracking,
        onChange: setLocationTracking,
      },
    },
    {
      type: 'ToggleField',
      props: {
        icon: FiLock,
        name: 'Share Usage Data',
        value: dataSharing,
        onChange: setDataSharing,
      },
    },
    {
      type: 'ToggleField',
      props: {
        icon: FiLock,
        name: 'Personalized Ads',
        value: adPersonalization,
        onChange: setAdPersonalization,
      },
    },
    {
      type: 'EditableTextField',
      props: {
        icon: FiLock,
        name: 'Change Password',
        type: 'password',
        value: password,
        onUpdate: setPassword,
        placeholder: 'Enter new password',
      },
    },
  ];

  const handleSaveChanges = () => {
    const privacySettings = {
      twoFactorAuth,
      locationTracking,
      dataSharing,
      adPersonalization,
      password: password ? '(Updated)' : '(Unchanged)',
    };

    console.log('Saving Privacy & Security Settings:', privacySettings);
    alert('Privacy & Security settings updated.');
  };

  const handleBack = () => {
    console.log('Back button clicked');
    // Add navigation logic here (e.g., useNavigate or history.goBack())
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <FiChevronLeft className="w-6 h-6" />
        </BackButton>
        <Title>Privacy & Security</Title>
      </Header>

      <EditStackedList items={privacySecurityItems} />

      <SaveButton onClick={handleSaveChanges}>
        Save Changes
      </SaveButton>
    </Container>
  );
};

export default PrivacyAndSecurity;
