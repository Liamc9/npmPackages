import React, { useState } from 'react';
import styled from 'styled-components';
import { EditStackedList } from 'liamc9npm';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Styled Components
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
    <Container>
      <Header>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <FiChevronLeft size={24} />
        </button>
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
    </Container>
  );
};

export default EditSettingsTemplate;
