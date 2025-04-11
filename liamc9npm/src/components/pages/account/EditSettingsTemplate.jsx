import React, { useState } from 'react';
import styled from 'styled-components';
import EditStackedList  from '../../../components/molecules/stackedlist/EditStackedList'
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Styled Components
const Page = styled.div`
  display: flex;
  flex-direction: column;
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

const EditSettingsTemplate = ({
  headerTitle = 'Settings',
  sections = [],
  initialValues = {},
  onSave,
  toggleColor,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialValues);

  // Whenever a field changes, update formData
  // and immediately call onSave (or log to console if onSave is not provided).
  const updateState = (fieldName, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [fieldName]: value };
      if (onSave) {
        onSave(newData);
      } else {
        console.log('Form Data:', newData);
      }
      return newData;
    });
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
            toggleColor={toggleColor}
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
    </Page>
  );
};

export default EditSettingsTemplate;
