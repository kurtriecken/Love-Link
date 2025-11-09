import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { StyledModalBox } from "../assets/style/loginModal.style";
import {
  StyledSubmitUploadButton,
  StyledUploadTypography,
} from "../assets/style/profile.style";
import { ADD_MESSAGE } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import Auth from "../utils/auth";
import { successMessage, errorMessage } from "../utils/helper/notifications";
import "react-toastify/dist/ReactToastify.css";

export const StartChatInTarget = ({ open, handleClose, talkWith }) => {
  const [addMessage] = useMutation(ADD_MESSAGE);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token || !message || !talkWith) {
      return false;
    }
    try {
      await addMessage({
        variables: {
          message: message,
          targetId: talkWith.toString(),
        },
      });
      successMessage("Message sent");
      handleClose();
    } catch (error) {
      errorMessage("Something went wrong, try again");
      console.error("Remove Mutation Error:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalBox>
        <form onSubmit={handleSubmit}>
          <StyledUploadTypography variant="h5">
            Start your first chat. Good luck!
          </StyledUploadTypography>
          <TextField
            type="text"
            multiline
            rows={5}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <StyledSubmitUploadButton
            type="submit"
            color="primary"
            variant="contained"
          >
            Chat
          </StyledSubmitUploadButton>
        </form>
      </StyledModalBox>
    </Modal>
  );
};
