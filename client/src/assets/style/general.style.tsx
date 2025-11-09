import styled from "styled-components";
import background from "../img/questionBackground.jpeg";
import Box from "@mui/material/Box";

export const BoxContainer = styled(Box)`
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;
export const SpinnerContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

