// src/components/ConversationList.js
import React from 'react';
import styled from 'styled-components';
import ConversationItem from '../atoms/menuitem/ConversationItem';

// Styled Components
const ListWrapper = styled.div`
  width: 100%;
`;

const ConversationList = ({ conversations, currentUser }) => {
  // Clone and sort conversations by lastMessage.timestamp descending
  const sortedConversations = conversations
    ? [...conversations].sort((a, b) => {
        // Extract timestamps safely
        const aTime = a.lastMessage?.timestamp?.toMillis
          ? a.lastMessage.timestamp.toMillis()
          : 0;
        const bTime = b.lastMessage?.timestamp?.toMillis
          ? b.lastMessage.timestamp.toMillis()
          : 0;
        // Sort in descending order (most recent first)
        return bTime - aTime;
      })
    : [];

  return (
    <ListWrapper>
      {sortedConversations.map((conversation) => (
        <ConversationItem 
          key={conversation.id} 
          conversation={conversation} 
          currentUser={currentUser}
        />
      ))}
    </ListWrapper>
  );
};


export default ConversationList;