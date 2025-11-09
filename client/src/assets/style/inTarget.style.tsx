import { styled as styledMUI } from "@mui/system";
import { blue } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { RiKakaoTalkLine } from "react-icons/ri";
import { TbHeartOff } from "react-icons/tb";

export const StyledCard = styledMUI(Card)`
display: flex;
flexDirection: column;
alignItems: center;
border-radius: 20px;
margin: 0 auto;
margin-top: 1%;
width: 85%;
box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.7);
&:hover {
    background-color: ${blue[100]};
    transform: scale(1.1);
    transition: transform 0.3s ease-in, color 0.5s ease-out;
  }
`;

export const StyledCardContent = styledMUI(CardContent)`
display: flex;
justify-content: space-between;
width: 100%;
alignItems: center
`;

export const StyledAvatar = styledMUI(Avatar)`
width: 70px;
height: 70px; 
margin-right: 10px
`;

export const TalkIcon = styledMUI(RiKakaoTalkLine)`
  color: #426075;
  font-size: 30px;
  margin-left: 10px;
  animation: heartbeat 0.9s infinite;
  transition: color 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
  }
`;

export const UnlikeIcon = styledMUI(TbHeartOff)`
   &:hover {
    color:  #426075;
    cursor: pointer;
  }
`;

export const StyledTypography = styledMUI(Typography)`
  text-align: center;
  margin: 20px;
`;

export const AvatarBox = styledMUI(Box)`
  display: flex;
  align-items: center;
`;