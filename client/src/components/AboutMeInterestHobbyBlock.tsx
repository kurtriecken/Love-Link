import { GET_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { AboutMeContent } from "./AboutMeContent";
import {
  StyledFlexBox,
  StyledSubtitle,
  StyledTitle,
} from "../assets/style/profile.style";
import { Spinner } from "./Spinner";

type AboutMeInterestHobbyBlockProps = {
  isUser: boolean,
  // TODO: update this with full type when I figure it out
  match: any
}

export const AboutMeInterestHobbyBlock: React.FC<AboutMeInterestHobbyBlockProps> = ({ isUser, match }) => {
  const { loading, error, data } = useQuery(GET_ME);
  const user = data?.me || {};

  let { firstName, lastName, dob, 
    hobbies, interests, gender } = user;


  if (loading) return <Spinner />
  if (error) return <p>Error: {error.message}</p>;
  if (isUser === false) {
    firstName = match.user.firstName;
    lastName = match.user.lastName;
    dob = match.user.dob ?? '';
    hobbies = match.user.hobbies;
    interests = match.user.interests;
    gender = match.user.gender;
  }

  let date = dob ? new Date(parseInt(dob)) : 'N/A';
  let age;

  if (date !== 'N/A') {
    age = calculateYearsSince(date as Date);
    date = formatDateToString(date as Date);
  } else age = 'N/A'

  function formatDateToString(date: Date) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    return formattedDate;
  }

  function calculateYearsSince(date: Date) {
    const currentDate = new Date();
    const yearsSince = currentDate.getFullYear() - date.getFullYear();

    // Check if the birthday for this year has occurred or not
    const hasBirthdayOccurred = (
      currentDate.getMonth() > date.getMonth() ||
      (currentDate.getMonth() === date.getMonth() && currentDate.getDate() >= date.getDate())
    );

    // If birthday hasn't occurred yet, subtract 1 from the calculated years
    const adjustedYearsSince = hasBirthdayOccurred ? yearsSince : yearsSince - 1;

    return adjustedYearsSince;
  }


  return (
    <>
      <StyledTitle variant="h4" pb={1}>
        {firstName} {lastName}
      </StyledTitle>
      <StyledSubtitle variant="h6">
        Date of birth: {date}
      </StyledSubtitle>
      <StyledSubtitle>
        Age: {age ?? ''}
      </StyledSubtitle>
      <StyledSubtitle>
        Gender: {gender}
      </StyledSubtitle>
      <StyledFlexBox>
        <AboutMeContent title="interests" content={interests} isUser={isUser} />
        <AboutMeContent title="hobbies" content={hobbies} isUser={isUser} />
      </StyledFlexBox>
    </>
  );
};
