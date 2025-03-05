// src/pages/MessagesView.js
import React from 'react';
import MessagesPrompt from '../components/MessagesPrompt';
import ConversationList from '../components/ConversationList';

export default function MessagesView({ currentUser, conversations, loading, error }) {
  return (
    <div>
      {!currentUser ? (
        <MessagesPrompt currentUser/>
      ) : (
        <div>
          {loading ? (
            <p>Loading conversations...</p>
          ) : error ? (
            <p>{error}</p>
          ) : conversations.length === 0 ? (
            <p>No conversations found.</p>
          ) : (
            <ConversationList conversations={conversations} currentUser={currentUser}/>
          )}
        </div>
      )}
    </div>
  );
}
