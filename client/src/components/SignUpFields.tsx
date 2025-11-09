import TextField from "@mui/material/TextField";
import {
  StyledFormControl,
  StyledTypography,
} from "../assets/style/signUpFields.style";

export const SignUpFields = ({ formData, handleChange }) => {
  return (
    <StyledTypography>
      <StyledFormControl>
        <TextField
          label="What is your first name?"
          variant="outlined"
          name="firstName"
          required
          value={formData.firstName}
          onChange={handleChange}
        />
      </StyledFormControl>
      <StyledFormControl>
        <TextField
          label="What is your last name?"
          variant="outlined"
          name="lastName"
          required
          sx={{ color: "white" }}
          value={formData.lastName}
          onChange={handleChange}
        />
      </StyledFormControl>
      <StyledFormControl>
        <TextField
          type="email"
          label="Enter your email"
          variant="outlined"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </StyledFormControl>
      <StyledFormControl>
        <TextField
          type="password"
          label="Enter your password"
          variant="outlined"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </StyledFormControl>
    </StyledTypography>
  );
};
