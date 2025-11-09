import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const StyledFaHeart = styled(FaHeart)`
  color: #90d1ff;
  font-size: 30px;
  margin-left: 10px;
  animation: heartbeat 1s infinite;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: white;
    cursor: pointer;
  }
`;

export const StyledArrow = styled(IoIosArrowRoundBack)`
  color: white;
  font-size: 20px;
  margin-left: 10px;
  margin-top: 5px;
`;

export const StyledContainer = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

export const StyledTypography = styled(Typography)`
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  padding-top: 3px;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
    1px 1px 0 #fff;
`;