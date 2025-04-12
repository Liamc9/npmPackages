// src/components/ConversationList.js
import React, { useMemo } from 'react';
import styled from 'styled-components';
import ConversationItem from '../atoms/menuitem/ConversationItem';

const ListWrapper = styled.div`
  width: 100%;
`;

const ConversationList = ({ conversations, currentUser, participantsData }) => {
  // Helper to extract time in milliseconds from a timestamp, handling Firestore or Date objects.
  const getTime = (timestamp) => {
    if (!timestamp) return 0;
    if (timestamp.toMillis) return timestamp.toMillis();
    if (timestamp.getTime) return timestamp.getTime();
    return new Date(timestamp).getTime();
  };

  // Sort conversations by lastMessage.timestamp (most recent first)
  const sortedConversations = useMemo(() => {
    return conversations
      ? [...conversations].sort((a, b) => {
          const aTime = getTime(a.lastMessage?.timestamp);
          const bTime = getTime(b.lastMessage?.timestamp);
          return bTime - aTime;
        })
      : [];
  }, [conversations]);

  return (
    <ListWrapper>
      {sortedConversations.map((conversation) => (
        <ConversationItem 
          key={conversation.id} 
          conversation={conversation} 
          currentUser={currentUser}
          participantsData={participantsData}
        />
      ))}
    </ListWrapper>
  );
};

export default ConversationList;
