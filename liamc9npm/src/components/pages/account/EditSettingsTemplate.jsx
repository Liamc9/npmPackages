import React, { useState } from 'react';
import styled from 'styled-components';
import { EditStackedList } from 'liamc9npm';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Styled Components
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

// Component
const EditSettingsTemplate = ({ headerTitle = 'Settings', sections = [], initialValues = {}, onSave }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialValues);

  const updateState = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    } else {
      console.log('Form Data:', formData);
      alert('Changes saved!');
    }
  };

  return (
    <Page>
       <Header>
              <BackButton onClick={() => navigate(-1)}>
                <FiChevronLeft size={24} />
              </BackButton>
              <Title>{headerTitle}</Title>
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
                value: formData[fieldName],
                options,
              },
            }))}
            updateState={updateState}
          />
        ))}
      </main>

      <Footer>
        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
      </Footer>
    </Page>
  );
};

export default EditSettingsTemplate;
