import { MatchCard, ProfileNavBar, Spinner } from "../components";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, GET_ME } from "../utils/queries";
import { BoxContainer } from "../assets/style/profile.style";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { SAVE_MATCH, REMOVE_MATCH } from "../utils/mutations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successMessage, errorMessage } from "../utils/helper/notifications";

import Auth from "../utils/auth";
import NoMatchesMessage from "../components/NoMatches";

export const Matches = () => {
  const { loading, data, refetch } = useQuery(GET_USERS);

  const {
    loading: myLoading,
    data: myData,
    refetch: myRefetch,
  } = useQuery(GET_ME);

  const [addMatch] =
    useMutation(SAVE_MATCH);
  const [removeMatch] = useMutation(REMOVE_MATCH);
  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    async () => {
      try {
        await refetch();
        await myRefetch();
        init();
      } catch (err) {
        errorMessage("Sorry, something went wrong.");
        console.error(err);
      }
    };
  }, [matchCount]);

  const containsAny = (arr, elements) => {
    return arr.some((item) => elements.includes(item));
  };

  const setMatch = async (userID) => {
    try {
      await addMatch({
        variables: {
          matchId: userID,
        },
      });
      successMessage("Successfully added.");
      refetch();
      setMatchCount(matchCount + 1);
    } catch (err) {
      console.error("Error!", err);
    }
  };

  const unlike = async (userId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    
    try {
      await removeMatch({
        variables: { matchId: userId },
      });
      successMessage("Successfully removed from your match list");
      refetch();
    } catch (err) {
      console.error("Error!", err);
    }
  };

  const loadMatches = () => {
  };

  if (loading || myLoading) {
    return <Spinner />;
  } else {
    loadMatches();
  }

  let users = [];
  const init = () => {
    if (data) {
      users = data.users
        .filter(
          // Matches where their gender matches what you're looking for
          (user) =>
            user.gender.toLowerCase() === myData.me.lookingFor.toLowerCase()
        )
        .filter(
          // Matches where your gender matches what they're looking for
          (user) =>
            user.lookingFor.toLowerCase() === myData.me.gender.toLowerCase()
        )
        .filter(
          // Gets users who share at least one hobby
          (user) => containsAny(user.hobbies, myData.me.hobbies)
        )
        .filter(
          // Gets users who share at least one interest
          (user) => containsAny(user.interests, myData.me.interests)
        )
        .filter((user) => user._id !== myData.me._id);
    }
  };
  init();

  return (
    <BoxContainer sx={{textAlign: "center"}}>
      <ProfileNavBar />
      <h2>Our curated matches just for you!</h2>
      <Grid container spacing={2} style={{paddingLeft:"5%", paddingRight:"5%"}}> 
        {users && users.length > 0 ? users.map((user, i) => (
          <Grid item xs={6} md={4} key={i}>
            <MatchCard user={user} setMatch={setMatch} me={myData.me} unlike={unlike} />
          </Grid>
        )) 
        : <NoMatchesMessage />}
      </Grid>
      <ToastContainer />
    </BoxContainer>
  );
};
