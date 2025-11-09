import { InfinitySpin } from "react-loader-spinner";
import { SpinnerContainer } from "../assets/style/general.style";

export const Spinner = () => {
  return (
    <SpinnerContainer>
      <InfinitySpin width="200" color="#33A4E0" />
    </SpinnerContainer>
  );
};
