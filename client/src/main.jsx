import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import {Error} from './pages/Error.jsx'
import { Intro } from "./pages/Intro.tsx";
import {Entry} from "./pages/Entry";
import {Profile} from "./pages/Profile";
import {Matches} from "./pages/Matches";
import {InTarget} from "./pages/InTarget";
import {Conversation} from "./pages/Conversation";
import { Greeting } from "./pages/Greeting.jsx";
import { QuestionOne } from "./pages/QuestionOne.tsx";
import { QuestionTwo } from "./pages/QuestionTwo.tsx";
import { QuestionThree } from "./pages/QuestionThree.tsx";
import { QuestionFour } from "./pages/QuestionFour.tsx";
import Auth from './utils/auth.ts'
import { ProfileUser } from "./pages/ProfileUser.tsx";
import "./assets/style/main.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Intro />,
      },
      {
        path: "/login",
        element: <Entry />,
      },
      {
        path: "/greeting",
        element: <Greeting />,
      },
      {
        path: "/question1",
        element: <QuestionOne />,
      },
      {
        path: "/question2",
        element: <QuestionTwo />,
      },
      {
        path: "/question3",
        element: <QuestionThree />,
      },
      {
        path: "/question4",
        element: <QuestionFour />,
      },
      {
        path: "/profile",
        element: Auth.loggedIn() ? <Profile /> : <Entry />,
      },
      {
        path: "/matches",
        element: Auth.loggedIn() ? <Matches /> : <Entry />,
      },
      {
        path: "/inTarget",
        element: Auth.loggedIn() ? <InTarget /> : <Entry />,
      },
      {
        path: "/conversation",
        element: Auth.loggedIn() ? <Conversation /> : <Entry />,
      },
      {
        path: "/user/:id",
        element: Auth.loggedIn() ? <ProfileUser /> : <Entry />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);