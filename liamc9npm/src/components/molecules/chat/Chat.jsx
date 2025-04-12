// src/components/Chat.js
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; /* Full viewport height */
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  color: #555;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 15px;
  justify-content: ${props => (props.sent ? 'flex-end' : 'flex-start')};
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.sent ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div`
  background-color: ${props => (props.sent ? '#A855F7' : '#ffffff')};
  color: ${props => (props.sent ? '#ffffff' : '#000000')};
  padding: 10px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: ${props => (props.sent ? '0 0 5px 40px' : '0 40px 5px 0')};
  max-width: 70%;
  overflow-wrap: break-word;
`;

const MessageText = styled.span`
  font-size: 1em;
`;

const Avatar = styled.div`
  margin: ${props => (props.sent ? '0 0 25px 5px' : '0 5px 25px 0')};
  flex-shrink: 0;
`;

const MessageTimestamp = styled.span`
  font-size: 0.7em;
  color: #757575;
  display: block;
  text-align: ${props => (props.sent ? 'right' : 'left')};
`;

const ChatInputContainer = styled.div`
  border-top: 1px solid #e0e0e0;
  background-color: #ffffff;
  padding: 15px 20px;
  display: flex;
  align-items: center;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 12px 18px;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
  outline: none;
  font-size: 1em;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #000;
  }
`;

const SendButton = styled.button`
  margin-left: 15px;
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
  
  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const defaultAvatarURL = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';

const ProfilePic = styled.img`
  width: ${props => props.size || '30px'};
  height: ${props => props.size || '30px'};
  border-radius: 50%;
  object-fit: cover;
`;

const Chat = ({
  initialConversation,
  currentUser,
  participantsData,  // Detailed mapping of user IDs to profiles.
  onSendMessage,     // External callback to update messages in the DB.
  newMessage,        // External newMessage state.
  setNewMessage,     // External setNewMessage function.
  messagesEndRef     // Ref for scrolling.
}) => {
  // Local conversation state, initialized with data from Firestore.
  const [conversation, setConversation] = useState(
    initialConversation || { participants: [], messages: [] }
  );

  // Update local conversation state when initialConversation changes.
  useEffect(() => {
    if (initialConversation) {
      setConversation(initialConversation);
    }
  }, [initialConversation]);

  // Build a participant map from the provided participantsData for a fast lookup.
  const participantMap = useMemo(() => {
    return participantsData || {};
  }, [participantsData]);

  // Scroll to the bottom when new messages arrive.
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages?.length, messagesEndRef]);

  // Handler for sending a message.
  const handleSendMessageInternal = () => {
    if (!newMessage.trim()) return;

    // Construct a new message using currentUser.uid
    const message = {
      localTimestamp: Date.now().toString(),
      sender: currentUser.uid,
      text: newMessage,
    };

    if (typeof onSendMessage === 'function') {
      onSendMessage(message);
    } else {
      setConversation(prev => ({
        ...prev,
        messages: [...(prev.messages || []), message],
      }));
    }
    setNewMessage('');
  };

  if (!conversation) {
    return <LoadingMessage>Loading conversation...</LoadingMessage>;
  }

  // Render a single message.
  const renderMessage = (message) => {
    const isSent = message.sender === currentUser.uid;
    // Use the participantMap to obtain the sender's profile data.
    const sender = participantMap[message.sender];
    const formattedTime = new Date(parseInt(message.localTimestamp, 10)).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return (
      <MessageContainer key={message.localTimestamp + message.sender} sent={isSent}>
        {/* Display avatar for received messages */}
        {!isSent && sender && (
          <Avatar sent={isSent}>
            <ProfilePic
              src={sender.photoURL || defaultAvatarURL}
              alt={sender.displayName || 'Sender'}
              size="30px"
            />
          </Avatar>
        )}
        <MessageContent sent={isSent}>
          <MessageBubble sent={isSent}>
            <MessageText>{message.text}</MessageText>
          </MessageBubble>
          <MessageTimestamp sent={isSent}>{formattedTime}</MessageTimestamp>
        </MessageContent>
        {/* Display avatar for sent messages */}
        {isSent && (
          <Avatar sent={isSent}>
            <ProfilePic
              src={(participantMap[currentUser.uid] &&
                      participantMap[currentUser.uid].photoURL) || defaultAvatarURL}
              alt={(participantMap[currentUser.uid] &&
                      participantMap[currentUser.uid].displayName) || 'You'}
              size="30px"
            />
          </Avatar>
        )}
      </MessageContainer>
    );
  };

  return (
    <ChatContainer>
      <ChatMessages>
        {(conversation.messages || []).map(renderMessage)}
        <div ref={messagesEndRef} />
      </ChatMessages>
      <ChatInputContainer>
        <ChatInput
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <SendButton onClick={handleSendMessageInternal} disabled={!newMessage.trim()}>
          Send
        </SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default Chat;
