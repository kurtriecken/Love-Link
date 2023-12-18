import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export const FormControlRadio = ({ title, value, onChange, name }) => {

  return (
    <FormControl>
      <FormLabel
        id="radio-buttons-group-label"
        style={{
          color: "#efbb96",
          textShadow:
            "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000",
        }}
      >
        {title}
      </FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="female"
        name={name}
        value={value}
        onChange={onChange}
      >
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
        <FormControlLabel
          value="Nonbinary"
          control={<Radio />}
          label="Nonbinary"
        />
      </RadioGroup>
    </FormControl>
  );
};
