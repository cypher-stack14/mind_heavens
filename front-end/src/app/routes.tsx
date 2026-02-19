import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import MentalHealthAssessment from "./pages/MentalHealthAssessment";
import Courses from "./pages/Courses";
import MindGames from "./pages/MindGames";
import CourseDetail from "./pages/CourseDetail";
import Resources from "./pages/Resources";
import BookTherapist from "./pages/BookTherapist";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/assessment",
    Component: MentalHealthAssessment,
  },
  {
    path: "/courses",
    Component: Courses,
  },
  {
    path: "/courses/:id",
    Component: CourseDetail,
  },
  {
    path: "/mindgames",
    Component: MindGames,
  },
  {
    path: "/resources",
    Component: Resources,
  },
  {
    path: "/book-therapist",
    Component: BookTherapist,
  },
]);