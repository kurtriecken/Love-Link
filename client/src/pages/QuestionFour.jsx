import { BiSolidSkipNextCircle } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoxContainer } from "../style/general.style";
import { StyledTextField, StyledTypography } from "../style/question.style";
import { useMutation } from "@apollo/client";
import { ADD_ABOUT } from "../utils/mutations";
import Auth from "../utils/auth";

export const QuestionFour = () => {
  const [userInput, setUserInput] = useState("");
  const [addAbout] = useMutation(ADD_ABOUT);
  const navigate = useNavigate();

  const runNextPage = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await addAbout({
        variables: { about: userInput },
      });
      console.log(userInput);
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
        onChange={(e) => setUserInput(e.target.value)}
      />
      <BiSolidSkipNextCircle
        onClick={runNextPage}
        style={{ fontSize: "4rem", marginTop: 10 }}
      />
    </BoxContainer>
  );
};
