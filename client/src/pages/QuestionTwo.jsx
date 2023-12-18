import { BiSolidSkipNextCircle } from "react-icons/bi";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { BoxContainer } from "../assets/style/general.style";
import {
  StyledTextField,
  StyledTypography,
} from "../assets/style/question.style";
import { useMutation } from "@apollo/client";
import { ADD_INTEREST } from "../utils/mutations";
import Auth from "../utils/auth";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successMessage } from "../utils/helper/notifications";

const options = [
  "🐕‍🦺 Animal Rescue",
  "💉 Vaccine Rights",
  "⛪ Faith",
  "👨‍👩‍👧‍👦 Family",
  "🧑‍💼 Politics",
  "🧘‍♀️ Mental health Awareness",
  "🏀 Sports Fans",
  "📚 Literature and Writing",
  "🎓 Education Advocacy",
  "🚗 Automobile Enthusiasts",
  "🌿 Environmental Sustainability",
  "📰 Journalism and Media",
  "🎤 Public Speaking",
  "🍷 Wine Tasting",
  "🔬 Science Fiction",
  "🌻 Gardening Enthusiasts",
  "🎧 Podcast Enthusiasts",
  "🕊️ Peace and Harmony",
  "🛠️ DIY Home Improvement",
  "🪷 Spiritual"
];

export const QuestionTwo = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  const [addInterest] = useMutation(ADD_INTEREST);

  useEffect(() => {
    successMessage("List all of your interests!");
  }, []);

  const runNextPage = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await addInterest({
        variables: { interests: selectedOptions },
      });
      navigate("/question3");
    } catch (error) {
      console.error("Mutation Error:", error);
    }
  };

  return (
    <BoxContainer>
      <StyledTypography variant="h4">What interests you?</StyledTypography>
      <Autocomplete
        multiple
        id="interests"
        options={options}
        onChange={(event, value) => setSelectedOptions(value)}
        value={selectedOptions}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            label="Interests"
            variant="outlined"
            sx={{ width: 300, margin: "15px" }}
          />
        )}
      />
      <BiSolidSkipNextCircle
        onClick={runNextPage}
        style={{ fontSize: "4rem" }}
      />
      <ToastContainer />
    </BoxContainer>
  );
};
