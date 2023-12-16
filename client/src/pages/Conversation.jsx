import heartIcon from "../assets/img/heart-icon.png";
import { useState, useEffect } from "react";
import "../assets/style/conversation.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, GET_ME } from "../utils/queries";
import { ADD_MESSAGE, SET_TOXIC } from "../utils/mutations";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import { ProfileNavBar, Spinner } from "../components";
import { BoxContainer } from "../assets/style/profile.style";
import * as toxicity from "@tensorflow-models/toxicity";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Backdrop from "@mui/material/Backdrop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  successMessage,
  warningMessage,
  errorMessage,
} from "../utils/helper/notifications";
import {
  ConversationMain,
  ConversationMessageBox,
  ConversationTitle,
  ConversationsContainer,
  ConversationsHeader,
  MatchesContainer,
  MatchesSidebar,
  MessageImage,
  MessageText,
  NoMessageTitle,
  StyledConversationInputBox,
} from "../assets/style/conversation.style";

export const Conversation = () => {
  const { loading, data, myError, refetch: myRefetch } = useQuery(GET_ME);

  const {
    loading: newLoading,
    data: newData,
    error,
    refetch,
  } = useQuery(GET_USERS);

  const [sendMessageMutation, { err }] = useMutation(
    ADD_MESSAGE,
    // invalidate cache of use query data
    {
      onCompleted: () => {
        refetch();
        myRefetch();
      },
    }
  );

  const [setToxic] = useMutation(SET_TOXIC);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [match, setMatch] = useState("");

  // For dialog modal
  const [open, setOpen] = useState(false);

  const [spinner, setSpinner] = useState(false);

  let mappedData;

  const loadMatches = () => {
    mappedData = newData.users.filter((user) =>
      data.me.matches.includes(user._id)
    );
    // mappedData = mappedData.slice(0, 5);
    mappedData = mappedData.map((person) => (
      <Button
        key={person.email}
        className="button match_buttons"
        centerRipple={true}
        onClick={() => getMessages(person)}
      >
        <img className="heart-icon" src={heartIcon} alt="Heart Icon" />
        <img
          className="match_images"
          src={person.image}
          alt="user avatar"
          style={{ borderRadius: "50px" }}
        />
      </Button>
    ));
  };

  useEffect(() => {
    (async () => {
      try {
        await refetch();
        await myRefetch();
        getMessages(match);
        console.log("in useEffect");
      } catch (err) {
        console.error(err);
      }
    })();
  }, [newData]);

  if (newLoading) {
    return <Spinner />;
  } else {
    loadMatches();
  }

  function formatDateTime(date) {
    // Get hours, minutes, and seconds from the date
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the time in 12-hour format with am/pm
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${hours < 12 ? "am" : "pm"}`;

    // Get the day of the week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];

    // Combine the formatted time and day
    const formattedDateTime = `${formattedTime} (${dayOfWeek})`;

    return formattedDateTime;
  }

  function getMessages(match) {
    // this will bring back the conversation between the two
    setMatch(match);
    let newArr1 = match.outbox?.filter((m) => m.userId === data.me._id);
    console.log("Match name: " + match.firstName);
    console.log("Match outbox:");
    console.log(newArr1);
    let newArr2 = data?.me?.outbox?.filter((m) => m.userId === match._id);
    let newArr = newArr1?.concat(newArr2);
    newArr = newArr?.sort((a, b) => a.createdAt - b.createdAt);
    newArr?.forEach((message) => {
      message.timeStamp = formatDateTime(new Date(parseInt(message.createdAt)));
    });
    setMessages(newArr);
  }

  const sendMessage = () => {
    makeMessage(input);
  };

  const makeMessage = async (text) => {
    try {
      const { data } = await sendMessageMutation({
        variables: {
          message: text,
          targetId: match._id.toString(),
        },
      });

      if (data) {
        loadMatches();
        getMessages(match);
      }
      successMessage("Message sent");
    } catch (err) {
      errorMessage("Something went wrong, try again");
      console.error(err);
    }
    setInput("");
    loadMatches();
  };

  const threshold = 0.9;
  const classify = (event) => {
    const sentence = event.target.value;
    setInput(event.target.value);
    if (event.key === "Enter") {
      setSpinner(true);
      toxicity.load(threshold).then((model) => {
        console.log(sentence);
        // Activate spinner
        model.classify(sentence).then((predictions) => {
          // Deactivate spinner
          setSpinner(false);
          for (let i = 0; i < predictions.length; i++) {
            if (predictions[i].results[0].match === true) {
              handleClickOpen();
            } else if (i === predictions.length - 1) {
              sendMessage();
            }
          }
        });
      });
    }
  };

  const flagAccountToxic = async () => {
    const retData = await setToxic();
    console.log(retData);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    successMessage("Excellent choice.");
    setOpen(false);
  };

  const handleCloseAndContinue = () => {
    setOpen(false);
    sendMessage();
    flagAccountToxic();
    warningMessage("Your profile marked as toxic user.");
  };

  return (
    <BoxContainer>
      <ProfileNavBar />
      <ConversationsContainer>
        <ConversationsHeader>
          <h1>{data.me.firstName}'s Conversations</h1>
        </ConversationsHeader>
        <MatchesContainer id="match_container">
          <MatchesSidebar id="match_sub">
            <ButtonGroup id="match_buttons" variant="none">
              {mappedData}
            </ButtonGroup>
          </MatchesSidebar>
          <ConversationMain id="conv_container">
            <ConversationTitle>
              {match
                ? `Your conversation with ${match.firstName}`
                : "Click on a match to start a conversation!"}
            </ConversationTitle>
            {messages?.length ? (
              messages.map((m, i) => (
                <ConversationMessageBox key={i}>
                  <MessageText>
                    <span style={{ fontWeight: "bold", color: "#8c5eeb" }}>
                      {m.text}
                    </span>
                    <span style={{ fontStyle: "italic" }}>
                      {" "}
                      @ {m.timeStamp}
                    </span>
                  </MessageText>
                  <MessageImage
                    src={m.userId !== match._id ? match.image : data.me.image}
                    alt="avatar"
                  />
                </ConversationMessageBox>
              ))
            ) : (
              <div>
                <NoMessageTitle>
                  No message history yet. Why don't you take the first step?
                </NoMessageTitle>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </div>
            )}
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
              <StyledConversationInputBox>
                <TextField
                  id="input-with-sx"
                  label="Type your message!"
                  variant="standard"
                  fullWidth={true}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  onKeyUp={classify}
                />
                <Avatar alt="Remy Sharp" src={data.me.image} />
              </StyledConversationInputBox>
            </Box>
          </ConversationMain>
        </MatchesContainer>
      </ConversationsContainer>
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Send a toxic message?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              We have determined that the message you wish to send is
              potentially toxic. Sending toxic messages may flag your account
              and make you less visible to potential matches.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
            <Button onClick={handleCloseAndContinue}>Send</Button>
          </DialogActions>
        </Dialog>
      </>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={spinner}
      >
        <Spinner />
      </Backdrop>
      <ToastContainer />
    </BoxContainer>
  );
};
