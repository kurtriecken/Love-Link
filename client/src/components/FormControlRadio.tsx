import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

type FormControlRadioProps = {
  title: String;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string
}

export const FormControlRadio: React.FC<FormControlRadioProps> = ({ title, value, onChange, name }) => {

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
