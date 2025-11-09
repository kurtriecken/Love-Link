import { ProfileNavBar, Spinner, StartChatInTarget } from "../components";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, GET_ME } from "../utils/queries";
import { REMOVE_MATCH } from "../utils/mutations";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { BoxContainer } from "../assets/style/profile.style";
import {
  AvatarBox,
  StyledAvatar,
  StyledCard,
  StyledCardContent,
  TalkIcon,
  UnlikeIcon,
} from "../assets/style/inTarget.style";
import { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { successMessage, errorMessage } from "../utils/helper/notifications";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const InTarget = () => {
  const [removeMatch] = useMutation(REMOVE_MATCH);
  const { loading, data, error, refetch } = useQuery(GET_USERS);
  const {
    loading: myLoading,
    data: myData,
    error: myError,
    refetch: myRefetch,
  } = useQuery(GET_ME);
  const [open, setOpen] = useState(false);
  const [talkWith, setTalkWith] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
    successMessage("Talk with your favorites");
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const onUnlikeUser = async (userId) => {
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
    } catch (error) {
      errorMessage("Something went wrong, try again");
      console.error("Remove Mutation Error:", error);
    }
  };

  const onStartTalk = (userId) => {
    setOpen(true);
    setTalkWith(userId);
  };

  const loadMatches = () => {
    const favorites = data.users.filter((user) =>
      myData.me.matches.includes(user._id)
    );

    const openMatchUserProfile = (userId) => {
      navigate(`/user/${userId}`);
    };

    return favorites.map((favorite, i) => (
      <StyledCard key={i}>
        <StyledCardContent>
          <AvatarBox onClick={() => openMatchUserProfile(favorite._id)}>
            <StyledAvatar alt="avatar" src={favorite.image} />
            <div>
              <Typography variant="h6">
                {favorite.firstName} {favorite.lastName}
              </Typography>
              <Typography>I am exactly who you're looking for</Typography>
            </div>
          </AvatarBox>
          <CardActions>
            <IconButton onClick={() => onUnlikeUser(favorite._id)}>
              <UnlikeIcon />
            </IconButton>
            <IconButton onClick={() => onStartTalk(favorite._id)}>
              <TalkIcon />
            </IconButton>
          </CardActions>
        </StyledCardContent>
      </StyledCard>
    ));
  };

  if (loading || myLoading) {
    return <Spinner />;
  }

  const favorites = loadMatches();

  return (
    <BoxContainer>
      <ProfileNavBar />
      {favorites.length ? (
        favorites
      ) : (
        <h5 style={{ textAlign: "center", marginTop: "20px" }}>
          First pick your favorites on Match page
        </h5>
      )}
      <StartChatInTarget
        open={open}
        handleClose={handleClose}
        talkWith={talkWith}
      />
      <ToastContainer />
    </BoxContainer>
  );
};
