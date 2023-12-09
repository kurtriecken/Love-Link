import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export const FormControlRadio = ({ title, value, onChange }) => {
  const formControlStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: "16px",
    borderRadius: "8px",
    marginRight: "32px"
  };

  return (
    <FormControl sx={formControlStyle}>
      <FormLabel id="demo-radio-buttons-group-label">{title}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={value}
        onChange={onChange}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel
          value="nonbinary"
          control={<Radio />}
          label="Nonbinary"
        />
      </RadioGroup>
    </FormControl>
  );
};
