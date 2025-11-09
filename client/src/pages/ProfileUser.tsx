import { useState} from "react";
import { useParams } from "react-router-dom";
import {
  AboutMe,
  AboutMeInterestHobbyBlock,
  Avatar,
  ProfileNavBar,
  Gallery,
  Spinner,
} from "../components";
import { BoxContainer } from "../assets/style/profile.style";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { GET_USER } from "../utils/queries";
import { useQuery} from "@apollo/client";

export const ProfileUser = () => {

  const [isUser] = useState(false);

  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: id },
  });

  const avatar = data?.user?.image;
  const gallery = data?.user?.gallery;

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  let matchAbout = data.user.about;

   return (
    <BoxContainer>
      <ProfileNavBar />
      <Box sx={{ flexGrow: 1, marginRight: "30px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ textAlign: "center" }}>
            </Box>
            <Avatar avatar={avatar} />
            <AboutMe 
              isUser={isUser}
              matchAbout={matchAbout}/>
          </Grid>
          <Grid item xs={8}>
            <AboutMeInterestHobbyBlock 
              isUser={isUser}
              match={data}/>
            <Typography variant="h5">
              Gallery
            </Typography>
            <Gallery gallery={gallery} />
          </Grid>
        </Grid>
      </Box>
    </BoxContainer>
  );
};
