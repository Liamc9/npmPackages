import React from 'react';
import styled from 'styled-components';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { StackedList } from 'liamc9npm'; // Make sure this works (default or named export)

// Styled components
const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  margin-right: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

// Component
const SettingsTemplate = ({ headerTitle = 'Page Title', settings = [] }) => {
  const navigate = useNavigate();

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {});

  return (
    <Page>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <FiChevronLeft size={24} />
        </BackButton>
        <Title>{headerTitle}</Title>
      </Header>

      {Object.keys(groupedSettings).map((category, idx) => (
        <StackedList key={idx} category={category} items={groupedSettings[category]} />
      ))}
    </Page>
  );
};

export default SettingsTemplate;
