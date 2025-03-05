
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MoneyIcon2, CalendarIcon, EditIcon, TrashIcon, LocationIcon } from "../../Branding/icons/Icons"; // Ensure these icons are correctly imported
import ImageCarousel2 from "../../atoms/carousels/ImageCarousel2";

// Styled Components

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  background-color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 600px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 1rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// New Styled Component for Image Wrapper
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 4; /* Set desired aspect ratio here */
  overflow: hidden;

  /* Ensure that ImageCarousel2 fills the wrapper */
  .swiper-wrapper {
    height: 100%;
  }
`;

const RentBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ffffff;
  color: #333;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.9rem;
  z-index: 10;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const DateRangeBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ffffff;
  color: #333;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.9rem;
  z-index: 10;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const TextContainer = styled.div`
  display: flex;
  padding: 0.75rem;
  background-color: #ffffff;
  align-items: center;
  flex-grow: 1;
`;

const ProfilePicture = styled.div`
  flex: 0 0 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  transition: transform 0.3s ease;

`;

const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleText = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 0.2rem;
`;

const LocationText = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  color: #666;
  gap: 0.1rem; /* Space between icon and text */
`;

const LocationIconStyled = styled(LocationIcon)`
  width: 25px;
  height: 25px;
`;

// Overlay Styles

const ManagingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Dark overlay */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  z-index: 20;
  padding: 1rem;
`;

const OverlayButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Space between buttons */
  width: 100%;
  max-width: 90%;
`;

const UpdateButton = styled.button.attrs({
  "aria-label": "Update Listing",
})`
  display: flex;
  align-items: center;
  background-color: #ffffff; /* White background */
  color: #3b82f6; /* Blue text */
  padding: 0.75rem 1rem;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
  border: 2px solid #3b82f6;

  &:hover {
    background-color: #3b82f6; /* Blue background on hover */
    color: #ffffff; /* White text on hover */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* Blue focus ring */
  }
`;

const RemoveButton = styled.button.attrs({
  "aria-label": "Remove Listing",
})`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff; /* White background */
  color: #ef4444; /* Red text */
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
  border: 2px solid #ef4444;

  &:hover {
    background-color: #ef4444; /* Red background on hover */
    color: #ffffff; /* White text on hover */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.5); /* Red focus ring */
  }
`;

// Main Component

const ListingCard = ({ data, isManaging, onUpdate, onRemove }) => {
  const {
    id,
    images,
    city,
    county,
    title, // Updated to use 'title'
    rent,
    startDate,
    endDate,
    photoURL,
  } = data;

  const dateRange =
    startDate && endDate ? `${startDate} - ${endDate}` : "Available Anytime";

  const defaultImage =
    "https://via.placeholder.com/600x600?text=No+Image+Available";
  const imageList = images && images.length > 0 ? images : [defaultImage];
  const profileImage = photoURL || "https://via.placeholder.com/150?text=Profile";

  // Card Content
  const content = (
    <CardContent>
      <ImageWrapper>
        <ImageCarousel2 images={imageList} />
        {rent !== undefined && (
          <RentBadge>
            <MoneyIcon2 className="w-6 h-6 mr-2" />€{rent}
          </RentBadge>
        )}
        {(startDate || endDate) && (
          <DateRangeBadge>
            <CalendarIcon className="w-6 h-6 mr-2" />
            {dateRange}
          </DateRangeBadge>
        )}
      </ImageWrapper>
      <TextContainer>
        <ProfilePicture>
          <ProfileImage src={profileImage} alt="Profile" />
        </ProfilePicture>
        <InfoContainer>
          <TitleText>
            {title ? title : "Title Unavailable"}
          </TitleText>
          <LocationText>
            <LocationIconStyled className="w-5 h-5" />
            {city}, {county}
          </LocationText>
        </InfoContainer>
      </TextContainer>
      {isManaging && (
        <ManagingOverlay>
          <OverlayButtonsContainer>
            <UpdateButton onClick={() => onUpdate(data)}>
              <EditIcon className="w-5 h-5 mr-2" />
              Update
            </UpdateButton>
            <RemoveButton onClick={() => onRemove(id)}>
              <TrashIcon className="w-5 h-5 mr-2" />
              Remove
            </RemoveButton>
          </OverlayButtonsContainer>
        </ManagingOverlay>
      )}
    </CardContent>
  );

  return (
    <CardContainer>
      {!isManaging ? (
        <StyledLink to={`/rooms/${id}`}>{content}</StyledLink>
      ) : (
        content
      )}
    </CardContainer>
  );
};

ListingCard.defaultProps = {
  isManaging: false,
  onUpdate: () => {},
  onRemove: () => {},
};


export default ListingCard;
