// src/components/ConversationItem.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// === Styled Components ===
const ItemWrapper = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 1rem;
  text-decoration: none;
  border-bottom: 1px solid #e0e0e0;
  color: inherit;
  position: relative;
`;

const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.span`
  font-size: 1.3rem;
  color: #333;
  font-weight: ${({ hasNewMessage }) => (hasNewMessage ? 700 : 600)};
`;

const Timestamp = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

const LastMessage = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: ${({ hasNewMessage }) => (hasNewMessage ? 700 : 400)};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
`;


// === Helper ===
const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  const messageDate = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const daysDiff = Math.floor(
    (now.setHours(0, 0, 0, 0) - messageDate.setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24)
  );

  if (daysDiff === 0) return 'Today';
  if (daysDiff === 1) return 'Yesterday';
  return `${daysDiff} days ago`;
};

// === Main Component ===
const ConversationItem = ({ conversation, currentUser }) => {
  const other = conversation.participants.find(p => p.uid !== currentUser.uid);
  if (!other) return null;

  return (
    <ItemWrapper to={`/conversation/${conversation.id}`}>
      <ProfilePic src={other.avatarUrl || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'} alt="Profile" />
      <Column>
        <Header>
          <Name hasNewMessage={conversation.hasNewMessage}>{other.name}</Name>
          <Timestamp>{formatTimestamp(conversation.lastMessage?.timestamp)}</Timestamp>
        </Header>
        <LastMessage hasNewMessage={conversation.hasNewMessage}>
          {conversation.lastMessage?.text}
        </LastMessage>
      </Column>
    </ItemWrapper>
  );
};

export default ConversationItem;
