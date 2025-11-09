import styled from "styled-components";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

export const StyledTypography = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  margin-right: 50px;
  gap: 15px;
`;

export const StyledFormControl = styled(FormControl)`
  display: flex;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
`;
