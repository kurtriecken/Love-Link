import {
  StyledAvatarImage,
  StyledAvatarPaper,
} from "../assets/style/profile.style";

type AvatarProps = {
  avatar: string
}

export const Avatar: React.FC<AvatarProps> = ({ avatar }) => {
  return (
    <StyledAvatarPaper>
      <StyledAvatarImage src={avatar} alt="Avatar" />
    </StyledAvatarPaper>
  );
};
