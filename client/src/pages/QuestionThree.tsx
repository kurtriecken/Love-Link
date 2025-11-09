import TextField from "@mui/material/TextField";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { BoxContainer } from "../assets/style/general.style";
import { StyledTypography } from "../assets/style/question.style";
import { useMutation } from "@apollo/client";
import { ADD_HOBBIES } from "../utils/mutations";
import Auth from "../utils/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successMessage } from "../utils/helper/notifications";
import { hobbiesOptions } from "../utils/constants";

export const QuestionThree = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [addHobbies] = useMutation(ADD_HOBBIES);
  const navigate = useNavigate();

   useEffect(() => {
     successMessage("List all of your hobbies!");
   }, []);

  const runNextPage = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await addHobbies({
        variables: { hobbies: selectedOptions },
      });
      navigate("/question4");
    } catch (error) {
      console.error("Mutation Error:", error);
    }
  };

  return (
    <BoxContainer>
      <StyledTypography variant="h4">
        Do you have any of these hobbies?
      </StyledTypography>
      <Autocomplete
        multiple
        id="hobbies"
        options={hobbiesOptions}
        onChange={(_, value) => setSelectedOptions(value)}
        value={selectedOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label="hobbies"
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
