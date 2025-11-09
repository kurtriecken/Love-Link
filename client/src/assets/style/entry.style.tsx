import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import entryBackground from "../img/entryBackground.jpeg";
import styled from "styled-components";

export const BoxContainer = styled(Box)`
  background-image: url(${entryBackground});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
`;

export const StyledTypography = styled(Typography)`
  padding-right: 8%;
  padding-bottom: 1%;
  text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff,
    2px 2px 0 #fff;
`;

export const StyledFormContainer = styled(Box)`
  color: black;
  margin-right: 37px;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 20px;
  border-radius: 8px;
`;

export const ButtonBox = styled(Box)`
  text-align: center;
  margin-right: 30px;
`;
