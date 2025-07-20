import styled from "styled-components";
import profileBackground from "../img/profileBackground.jpeg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import { TbHeartOff } from "react-icons/tb";
import { RiHeartAddFill } from "react-icons/ri";
import { styled as styledMUI } from "@mui/system";

export const BoxContainer = styledMUI(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: auto;
  background-image: url(${profileBackground});
  background-size: cover;
  background-position: center;
  `;

export const StyledAvatarPaper = styledMUI(Paper)`
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
  overflow: hidden;
  margin: auto;
  margin-bottom: 15px
`;

export const StyledAvatarImage = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TransparentPaper = styledMUI(Paper)`
  width: 70%;
  height: auto;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.4);
`;

export const TransparentBox = styledMUI(Box)`
 flex-direction: column; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTitle = styledMUI(Typography)`
  font-size: 1.6rem;
  text-transform: uppercase;
`;

export const StyledSubtitle = styledMUI(Typography)`
  font-size: 1.2rem;
`;

export const StyledAboutMeText = styledMUI(Typography)`
  line-height: 1.5rem;
  padding: 4%;
  text-align: center;
  font-size: 0.7rem;

  @media (min-width: 600px) {
    font-size: 0.8rem;
  }

  @media (min-width: 960px) {
    font-size: 1rem;
  }

  @media (min-width: 1280px) {
    font-size: 1.2rem;
  }
`;

export const StyledFlexBox = styledMUI(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  @media (min-width: 765px) {
    flex-direction: row;
  }
  @media (min-width: 960px) {
    flex-direction: row;
  }
`;

export const StyledContentPaper = styledMUI(Paper)`
  max-width: 100%;
  flex: 1;
  margin: 1rem;
  padding: 2rem;
  border-radius: 19px;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const StyledContentTypography = styledMUI(Typography)`
  font-size: 1.1rem;
  margin-bottom: 6%;
  display: flex;
  justify-content: space-between
`;

export const StyledTbHeartOff = styledMUI(TbHeartOff)`
  cursor: pointer;

  &:hover {
    animation: heartbeat 0.6s infinite;
  }

  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.3);
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const StyledDeleteButton = styledMUI(Button)`
  border: 1px solid black;
  border-radius: 30px;
  font-size: 13px;
  text-transform: lowercase;
  line-height: 1;

  &:hover {
    background-color: ${blue[100]};
  }
`;

export const StyledRiHeartAddFill = styledMUI(RiHeartAddFill)`
  font-size: 1.7rem;
  border: 1px solid black;
  border-radius: 30px;
  padding: 3px;
  color: white;
  background-color: #42a5f5;
  cursor: pointer;

  &:hover {
    animation: heartbeat 1.2s infinite;
  }

  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const StyledButton = styledMUI(Button)`
 &:hover {
    background-color: ${blue[100]};
  }
`;

export const StyledUploadButton = styledMUI(Button)`
  font-size: 18px;

  &:hover {
    transition: transform 0.3s ease-in, color 0.5s ease-out;
    transform: scale(1.1);
  }
`;

export const StyledSubmitUploadButton = styledMUI(Button)`
  display: block;
  margin: 0 auto;
  margin-top: 10px;
  background-color: #EBD7B4;
`;

export const StyledUploadTypography = styledMUI(Typography)`
  text-align: center;
  margin: 20px;
`;

export const StyledMediaCard = styledMUI(Card)`
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.7)
`;
