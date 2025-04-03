// src/components/search/LoadMoreButton.jsx
import React from 'react';
import styled from 'styled-components';

const LoadMoreButtonStyled = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoadMoreButton = ({ loadMore, hasMoreItems, onLoadMore }) => {
  if (!loadMore || !hasMoreItems) return null;

  return (
    <LoadMoreButtonStyled onClick={onLoadMore}>
      Load More
    </LoadMoreButtonStyled>
  );
};

export default LoadMoreButton;
