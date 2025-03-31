import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiPhone, FiHelpCircle, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const SupportContainer = styled.div`
  position: relative;
  padding: 24px;
  font-family: Arial, sans-serif;
  max-width: 500px;
  margin: auto;
  color: #333;
`;

const BackButton = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  cursor: pointer;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #888;
  font-size: 14px;
  margin-bottom: 32px;
`;

const Option = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-top: 1px solid #eaeaea;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:last-child {
    border-bottom: 1px solid #eaeaea;
  }
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HelpAndFAQs = () => {
  const navigate = useNavigate();

  return (
    <SupportContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FiChevronLeft size={20} color="#333" />
      </BackButton>

      <Title>Get Support</Title>
      <Subtitle>
        Get help finding the right products and services for your needs.
      </Subtitle>

      <Option to="./contactus">
        <OptionContent>
          <FiPhone size={20} />
          Call Us
        </OptionContent>
        <FiChevronRight size={20} color="#aaa" />
      </Option>

      <Option to="./faqs">
        <OptionContent>
          <FiHelpCircle size={20} />
          Browse FAQs
        </OptionContent>
        <FiChevronRight size={20} color="#aaa" />
      </Option>
    </SupportContainer>
  );
};

export default HelpAndFAQs;
