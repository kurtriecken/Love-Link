import { styled as styledMUI } from "@mui/system";
import styled from "styled-components";
import Box from "@mui/material/Box";

export const ConversationsContainer = styled.div`
  margin: 0 auto;
  width: 95%;
  height: 100vh;
  padding: 5%; 
`;

export const ConversationsHeader = styled.div`
  margin: auto;
  width: 100%;
  text-align: center;
  padding: 10px 10%;
`;

export const MatchesContainer = styled.div`
  display: flex;
`;

export const MatchesSidebar = styled.div`
  width: 20%;
  margin: 10px 10px;
  padding: 10px 10px;
  border: solid #8c5eeb 3px;
  border-radius: 30px;
`;

export const ConversationMain = styled.div`
  width: 70%;
 `;
export const ConversationTitle = styled.h3`
  text-align: center;
  padding-bottom: 15px;
`;

export const ConversationMessageBox = styled.div`
  display: flex;
  flex-direction: row;
  border: solid #8c5eeb 3px;
  border-radius: 10px;
  justify-content: flex-end;
  padding: 5px;

`;
export const MessageText = styled.p`
  align-self: center;
  text-align: center;
  margin-right: 30px;
 `;

export const MessageImage = styled.img`
  border-radius: 50px;
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

export const NoMessageTitle = styled.p`
  text-align: center;
 `;

 export const StyledConversationInputBox = styledMUI(Box)`
   display: flex;
   align-items: flex-end;
 `;