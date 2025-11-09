import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { EntryNavBar, SignUpFields, FormControlRadio } from "../components";
import {
  BoxContainer,
  StyledFormContainer,
  StyledTypography,
  ButtonBox,
} from "../assets/style/entry.style";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successMessage, errorMessage } from "../utils/helper/notifications";

export const Entry = () => {
  const [addUser] = useMutation(ADD_USER);
  const [formData, setFormData] = useState({
    gender: "",
    lookingFor: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    successMessage("Hi dear! Login or Signup, waiting for you...");
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const resetForm = () => {
    setFormData({
      gender: "",
      lookingFor: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...formData },
      });
      Auth.signUp(data.addUser.token);
    } catch (err) {
      errorMessage("Something went wrong. Try again");
      console.error(err);
    }
    resetForm();
  };

  return (
    <>
      <EntryNavBar />
      <BoxContainer>
        <StyledTypography variant="h4">Let&apos;s get started!</StyledTypography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex" }}>
            <StyledFormContainer>
              <FormControlRadio
                title="I am"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </StyledFormContainer>
            <StyledFormContainer>
              <FormControlRadio
                title="I am looking for"
                value={formData.lookingFor}
                name="lookingFor"
                onChange={handleChange}
                required
              />
            </StyledFormContainer>
          </Box>
          <SignUpFields formData={formData} handleChange={handleChange} />
          <ButtonBox>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ padding: "8px 26px" }}
            >
              Join
            </Button>
          </ButtonBox>
        </form>
        <ToastContainer />
      </BoxContainer>
    </>
  );
};
