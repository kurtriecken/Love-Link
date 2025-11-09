import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successMessage = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 3000,
  });
};

export const errorMessage = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 3000,
  });
};

export const warningMessage = (message: string) => {
  toast.warning(message, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 3000,
  });
};
