import {
  StyledAboutMeText,
  TransparentBox,
  TransparentPaper,
} from "../assets/style/profile.style";
import { GET_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { TfiThought } from "react-icons/tfi";
import { Spinner } from "./Spinner";

type AboutMeProps = {
  isUser: boolean,
  matchAbout: string
}

export const AboutMe: React.FC<AboutMeProps> = ({ isUser, matchAbout }) => {
  const { loading, error, data } = useQuery(GET_ME);
  let about = data?.me?.about;

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  if (isUser === false) {
    about = matchAbout;
  }

  return (
    <TransparentBox>
      <TransparentPaper elevation={5}>
        <StyledAboutMeText>
          <TfiThought
            style={{ width: "15%", height: "30%", paddingRight: "10px" }}
          />
          {about}
        </StyledAboutMeText>
      </TransparentPaper>
    </TransparentBox>
  );
};
