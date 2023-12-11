import { useState } from "react";
import {
  StyledContentPaper,
  StyledContentTypography,
  StyledDeleteButton,
  StyledRiHeartAddFill,
  StyledTbHeartOff,
} from "../style/profile.style";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { ADD_HOBBIES } from "../utils/mutations";
import { ADD_INTEREST } from "../utils/mutations";
import { REMOVE_INTEREST } from "../utils/mutations";
import Auth from "../utils/auth";

export const AboutMeContent = ({ title, content, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addHobbies] = useMutation(ADD_HOBBIES);
  const [addInterest] = useMutation(ADD_INTEREST);
  const [removeInterest] = useMutation(REMOVE_INTEREST);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelection = async (item) => {
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

  const options =
    title === "interests"
      ? [
          "🐕‍🦺 Animal Rescue",
          "💉 Vaccine Rights",
          "⛪ Faith",
          "👨‍👩‍👧‍👦 Family",
          "🧑‍💼 Politics",
          "🧘‍♀️ Mental health Awareness",
        ]
      : [
          "📽️ Movie Buffs",
          "🗺️ History",
          "👒 Fashion and Style",
          "🐈‍⬛ Pet Lover",
          "🎭 Comedy/ Humor",
          "✂️ Crafting",
          "🎮 Gamer",
          "🏕️ Outdoor Adventures",
          "🎻 Music Lover",
          "🏋️‍♂️ Fitness/Wellness",
          "✈️ Traveling",
          "🥞 Foodies",
          "📖 Bookworms",
          "🫂 Volunteering",
          "💻 Tech/Innovation",
          "🏎️ Motorcycle or Car Enthusiasts",
          "📸 Photography",
          "💃 Dance/Performing Arts",
        ];

  return (
    <>
      <StyledContentPaper>
        <StyledContentTypography variant="h6">
          Favorite {title}:
          <StyledRiHeartAddFill onClick={openModal} />
        </StyledContentTypography>
        {content &&
          content.map((item) => (
            <Badge
              key={item}
              badgeContent={<StyledTbHeartOff onClick={() => onDelete(item)} />}
              color="info"
              sx={{ margin: "2%" }}
            >
              <StyledDeleteButton>{item}</StyledDeleteButton>
            </Badge>
          ))}
      </StyledContentPaper>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Select {title}</DialogTitle>
        <DialogContent>
          {options.map((option) => (
            <div key={option}>
              <Button onClick={() => handleSelection(option)}>{option}</Button>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
