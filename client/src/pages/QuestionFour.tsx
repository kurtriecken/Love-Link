import { BiSolidSkipNextCircle } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BoxContainer } from "../assets/style/general.style";
import {
  StyledTextField,
  StyledTypography,
} from "../assets/style/question.style";
import { useMutation } from "@apollo/client";
import { ADD_ABOUT } from "../utils/mutations";
import Auth from "../utils/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successMessage } from "../utils/helper/notifications";
import { TextFieldChangeEvent } from "../types/mui";

export const QuestionFour = () => {
  const [userInput, setUserInput] = useState("");
  const [addAbout] = useMutation(ADD_ABOUT);
  const navigate = useNavigate();

    useEffect(() => {
      successMessage("We're almost there...Be brief but catchy!");
    }, []);

  const runNextPage = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await addAbout({
        variables: { about: userInput },
      });
      navigate("/profile");
    } catch (error) {
      console.error("Mutation Error:", error);
    }
  };

  return (
    <BoxContainer>
      <StyledTypography variant="h4">Tell us about yourself?</StyledTypography>
      <StyledTextField
        multiline
        rows={4}
        label="Be creative..."
        variant="outlined"
        value={userInput}
        onChange={(e: TextFieldChangeEvent) => setUserInput(e.target.value)}
      />
      <BiSolidSkipNextCircle
        onClick={runNextPage}
        style={{ fontSize: "4rem", marginTop: 10 }}
      />
      <ToastContainer />
    </BoxContainer>
  );
};
