import { useState, useEffect, useRef } from "react";
import {
  AboutMe,
  Avatar,
  AboutMeInterestHobbyBlock,
  ProfileNavBar,
  Gallery,
  Spinner,
} from "../components";
import {
  BoxContainer,
  StyledSubmitUploadButton,
  StyledUploadButton,
} from "../assets/style/profile.style";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { TbPhotoPlus } from "react-icons/tb";
import { GET_ME } from "../utils/queries";
import { ADD_PROFILE_IMG, ADD_GALLERY_IMG } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successMessage, errorMessage } from "../utils/helper/notifications";

export const Profile = () => {
  const [showProfileButton, setProfileButton] = useState(false);
  const [showGalleryButton, setGalleryButton] = useState(false);
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [galleryImgUrl, setGalleryImgUrl] = useState([]);
  const { loading, error, data } = useQuery(GET_ME);
  const [addProfileImg] = useMutation(ADD_PROFILE_IMG);
  const [addGalleryImg] = useMutation(ADD_GALLERY_IMG);

  const cloudinaryRef = useRef();
  const widgetRefProfile = useRef();
  const widgetRefGallery = useRef();

  useEffect(() => {
    successMessage("Good to see you🩵");

    cloudinaryRef.current = window.cloudinary;
    widgetRefProfile.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_API_KEY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_API_KEY_UPLOAD_PRESENT,
        folder: "lovelink/profile",
        theme: "purple",
      },
      function (err, result) {
        if (result.event === "success") {
          setProfileImgUrl(result.info.secure_url);
          setProfileButton(true);
        }
      }
    );

    const galleryArray = [];

    widgetRefGallery.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_API_KEY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_API_KEY_UPLOAD_PRESENT,
        folder: "lovelink/gallery",
        theme: "purple",
      },
      function (err, result) {
        if (result.event === "success") {
          const newObj = {
            name: result.info.original_filename,
            imageUrl: result.info.secure_url,
          };

          galleryArray.push(newObj);

          setGalleryButton(true);
          setGalleryImgUrl(galleryArray);
        }
      }
    );
  }, []);

  const avatar = data?.me?.image;
  const gallery = data?.me?.gallery;

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  const updateUserGallery = async () => {
    setGalleryButton(false);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await addGalleryImg({
        variables: { gallery: galleryImgUrl },
      });
      successMessage("Uploaded. You can add more!");
    } catch (error) {
      errorMessage("Something went wrong, try again");
      console.error("Remove Mutation Error:", error);
    }
  };

  const updateUserAvatar = async () => {
    setProfileButton(false);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await addProfileImg({
        variables: { image: profileImgUrl },
      });
      successMessage("What a great picture!");
    } catch (error) {
      errorMessage("Something went wrong, try again");
      console.error("Mutation Error:", error);
    }
  };

  return (
    <BoxContainer>
      <ProfileNavBar />
      <Box sx={{ flexGrow: 1, marginRight: "30px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ textAlign: "center" }}>
              <StyledUploadButton
                onClick={() => widgetRefProfile.current.open()}
              >
                <TbPhotoPlus />
              </StyledUploadButton>
            </Box>
            <Avatar avatar={avatar} />
            <AboutMe />
            {showProfileButton ? (
              <StyledSubmitUploadButton onClick={updateUserAvatar}>
                update
              </StyledSubmitUploadButton>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={8}>
            <AboutMeInterestHobbyBlock />
            <Typography variant="h5">
              Gallery{" "}
              <StyledUploadButton
                onClick={() => widgetRefGallery.current.open()}
              >
                <TbPhotoPlus />
              </StyledUploadButton>
              {showGalleryButton ? (
                <StyledSubmitUploadButton onClick={updateUserGallery}>
                  update
                </StyledSubmitUploadButton>
              ) : (
                ""
              )}
            </Typography>
            <Gallery gallery={gallery} />
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
     </BoxContainer>
  );
};
