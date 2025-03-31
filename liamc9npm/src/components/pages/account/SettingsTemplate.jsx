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
  justify-content: center;
  position: relative;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb; /* light tailwind-gray */
`;


const BackButton = styled.button`
  position: absolute;
  left: 0;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
`;


const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
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