// src/components/RoomsView.jsx

import React, { useState } from "react";
import styled from "styled-components";
import ImageCarousel2 from "../../atoms/carousels/ImageCarousel2";
import { CalendarIcon, LocationIcon, ChevronLeftIcon } from "../../Branding/icons/Icons";
import BottomDrawer from "../../atoms/Drawers/BottomDrawer";
import MessageForm from "../components/MessageForm";
import { useNavigate } from "react-router-dom"; 
import PropTypes from "prop-types";

// Styled Components (Moved from Rooms.jsx)
const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 100px; /* Space for the fixed bottom bar */
  position: relative; /* Make it a positioned parent for the absolute BackButton */
`;


const BackButton = styled.button`
  position: absolute;
  top: 20px; /* Adjust as needed */
  left: 20px; /* Adjust as needed */
  width: 40px;
  height: 40px;
  border: 1px solid #e0e0e0;
  padding: 5px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 50; /* Ensure it's above the conversation content */
  }
`;

const ImageContainer = styled.div`
  aspect-ratio: 5 / 4;
  overflow: hidden;
`;

const RoomTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  font-weight: bold;
  margin-left: 1rem;
  margin-top: 60px; /* Space for the BackButton */
`;

const DatesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 1rem auto 0;
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

  .icon-container {
    flex: 0 0 20%; /* 20% of the container */
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  .dates {
    display: flex;
    flex: 1;
    justify-content: space-between;

    .date-item {
      flex: 0 0 40%; /* Each section takes 40% of the container */
      display: flex;
      flex-direction: column;
      align-items: flex-start; /* Changed from 'left' to 'flex-start' */
      margin-left: 2rem;

      .date-label {
        font-size: 1rem;
        font-weight: 600; /* semi-bold */
        color: #555;
      }

      .date-value {
        font-size: 1.4rem;
        font-weight: bold;
        color: #333;
      }
    }
  }
`;

const SectionHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 2rem;
  text-align: left;
  width: 100%;
  margin-left: 1rem;
`;

const SectionContent = styled.div`
  font-size: 1rem;
  color: #666;
  text-align: left;
  width: 100%;
  line-height: 1.5;
  margin-left: 1rem;
`;

// New Styled Components for Location
const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Space between address and map */
  width: 90%;
`;

const AddressText = styled.span`
  font-size: 1.1rem;
  color: #666;
`;

// Styled components for the drawer and message form
const FixedBottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:  1rem;
  z-index: 20;
`;

const RentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RentLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  color: #999;
`;

const RentText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const SendMessageButton = styled.button`
  background-color: #A855F7;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;


  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 1.5rem;
  color: red;
`;

// Display Component
const RoomsView = ({
  roomData,
  handleSend,
  currentUser,
  id,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  if (!roomData) {
    return <ErrorContainer>Room not found.</ErrorContainer>;
  }

  const handleSendMessage = () => {
    if (!currentUser) {
      // Redirect to login if the user is not logged in
      navigate("/login", { state: { from: `/rooms/${id}` } });
      return;
    }

    // Open the message form drawer
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleBackClick = () => {
    window.history.back();
    // Alternatively, use navigate(-1) if you prefer:
    // navigate(-1);
  };

  const images = roomData.images && Array.isArray(roomData.images) ? roomData.images : [];

  return (
    <>
      <RoomContainer>
        {/* Back Button */}
        <BackButton onClick={handleBackClick} aria-label="Go Back">
          <ChevronLeftIcon />
        </BackButton>

        <ImageContainer>
          {images.length > 0 ? (
            <ImageCarousel2 images={images} />
          ) : (
            <p>No images available</p>
          )}
        </ImageContainer>
        <RoomTitle>{roomData.title || "Room Title"}</RoomTitle>
        <DatesContainer>
          <div className="icon-container">
            <CalendarIcon />
          </div>
          <div className="dates">
            <div className="date-item">
              <span className="date-label">From</span>
              <span className="date-value">{roomData.startDate || "Anytime"}</span>
            </div>
            <div className="date-item">
              <span className="date-label">To</span>
              <span className="date-value">{roomData.endDate || "Anytime"}</span>
            </div>
          </div>
        </DatesContainer>

        <SectionHeader>Location</SectionHeader>
        <SectionContent>
          <LocationContainer>
            <LocationIcon className="w-6 h-6" />
            <AddressText>
              {roomData.streetAddress ? roomData.streetAddress : "No address provided"}, {roomData.city ? roomData.city : "City"}, {roomData.county ? roomData.county : "County"}, {roomData.eircode ? roomData.eircode : "eirCode"}
            </AddressText>
          </LocationContainer>
        </SectionContent>

        <SectionHeader>Description</SectionHeader>
        <SectionContent>
          {roomData.description ? roomData.description : "No description provided"}
        </SectionContent>
      </RoomContainer>
      <FixedBottomBar>
        <RentContainer>
          <RentLabel>Monthly Rent</RentLabel>
          <RentText>€{roomData.rent !== undefined ? roomData.rent : "N/A"}</RentText>
        </RentContainer>
        <SendMessageButton onClick={handleSendMessage} disabled={roomData.userId === currentUser?.uid}>
          Send Message
        </SendMessageButton>
      </FixedBottomBar>
      <BottomDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        transitionDuration={300}
        height="50%" // Adjust height as needed
        maxWidth="600px"
      >
        <MessageForm onSend={handleSend} onClose={closeDrawer} />
      </BottomDrawer>
    </>
  );
};

RoomsView.propTypes = {
  roomData: PropTypes.object.isRequired,
  handleSend: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  id: PropTypes.string.isRequired,
};

export default RoomsView;
