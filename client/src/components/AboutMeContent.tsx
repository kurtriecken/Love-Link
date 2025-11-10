import { useState } from "react";
import {
  StyledButton,
  StyledContentPaper,
  StyledContentTypography,
  StyledDeleteButton,
  StyledRiHeartAddFill,
  StyledTbHeartOff,
} from "../assets/style/profile.style";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useMutation } from "@apollo/client";
import {
  ADD_HOBBIES,
  ADD_INTEREST,
  REMOVE_INTEREST,
  REMOVE_HOBBIES,
} from "../utils/mutations";
import Auth from "../utils/auth";
import { AboutMeContentProps } from '../types/aboutMe'
import { hobbiesOptions, interestsOptions } from "../utils/constants";

export const AboutMeContent = ({ title, content, isUser }: AboutMeContentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addHobbies] = useMutation(ADD_HOBBIES);
  const [addInterest] = useMutation(ADD_INTEREST);
  const [removeInterest] = useMutation(REMOVE_INTEREST);
  const [removeHobby] = useMutation(REMOVE_HOBBIES);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelection = async (item: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      title === "interests"
        ? await addInterest({ variables: { interests: item } })
        : title === "hobbies"
        ? await addHobbies({ variables: { hobbies: item } })
        : null;
    } catch (error) {
      console.error("Mutation Error:", error);
    }
    closeModal();
  };

  const handleDeleteItem = async (item: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token || !item) {
      return false;
    }

    try {
      title === "interests"
        ? await removeInterest({ variables: { interests: item } })
        : title === "hobbies"
        ? await removeHobby({ variables: { hobbies: item } })
        : null;
    } catch (error) {
      console.error("Remove Mutation Error:", error);
    }
  };

  const options =
    title === "interests"
      ? interestsOptions
      : hobbiesOptions;

  return (
    <>
      <StyledContentPaper>
        <StyledContentTypography variant="h6">
          Favorite {title}:
          {isUser === false ? '': <StyledRiHeartAddFill onClick={openModal} /> }
        </StyledContentTypography>
        {content && content.length > 0 ?
          content.map((item) => (
            <Badge
              key={item}
              color="info"
              badgeContent={
                isUser === false ? null : 
                <StyledTbHeartOff
                  onClick={() => {
                    handleDeleteItem(item);
                  }}
                />
              }
              sx={{ margin: "2%" }}
            >
              <StyledDeleteButton>{item}</StyledDeleteButton>
            </Badge>
          )) : 
          <p>No {title} saved</p>}
      </StyledContentPaper>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Select {title}</DialogTitle>
        <DialogContent>
          {options.map((option) => (
            <div key={option}>
              <StyledButton onClick={() => handleSelection(option)}>
                {option}
              </StyledButton>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={closeModal}>Cancel</StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
};