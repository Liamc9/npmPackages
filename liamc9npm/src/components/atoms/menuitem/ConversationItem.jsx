// src/components/ConversationItem.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

// Helper to display a "time ago" format
const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

  const now = new Date();
  const today = new Date(now);
  const messageDay = new Date(date);

  // Zero out time for both dates
  today.setHours(0, 0, 0, 0);
  messageDay.setHours(0, 0, 0, 0);

  const msDiff = today - messageDay;
  const daysDiff = Math.floor(msDiff / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) return 'Today';
  if (daysDiff === 1) return 'Yesterday';
  return `${daysDiff} days ago`;
};


const ConversationItem = ({ conversation, currentUser, participantsData }) => {
  // Identify the other participant’s UID
  const otherUID = conversation.participantUIDs.find(uid => uid !== currentUser.uid);
  // Look up the other participant’s profile from participantsData
  const other = participantsData && participantsData[otherUID] ? participantsData[otherUID] : {};

  return (
    <ItemWrapper to={`/conversation/${conversation.id}`}>
      <ProfilePic
        src={other.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'}
        alt="Profile"
      />
      <Column>
        <Header>
          <Name hasNewMessage={conversation.hasNewMessage}>
            {other.displayName || otherUID}
          </Name>
          <Timestamp>{formatTimestamp(conversation.lastMessage?.localTimestamp)}</Timestamp>
        </Header>
        <LastMessage hasNewMessage={conversation.hasNewMessage}>
          {conversation.lastMessage?.text}
        </LastMessage>
      </Column>
    </ItemWrapper>
  );
};

export default ConversationItem;
