import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import background from "../assets/img/questionBackground.jpeg";
import Typography from "@mui/material/Typography";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";

const options = [
  "🐕‍🦺 Animal Rescue",
  "💉 Vaccine Rights",
  "⛪ Faith",
  "👨‍👩‍👧‍👦 Family",
  "🧑‍💼 Politics",
  "🧘‍♀️ Mental health Awareness",
];

export const QuestionTwo = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  console.log(selectedOptions);
  const runNextPage = () => {
    console.log(selectedDate);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <Typography sx={{ fontSize: "1.5rem", padding: "10px" }}>
        What is interest you?
      </Typography>
      <Autocomplete
        multiple
        id="interests"
        options={options}
        onChange={(event, value) => setSelectedOptions(value)}
        value={selectedOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Interests"
            variant="outlined"
            sx={{ width: 300 }}
          />
        )}
      />
      <BiSolidSkipNextCircle
        onClick={runNextPage}
        style={{ fontSize: "4rem" }}
      />
    </Box>
  );
};
