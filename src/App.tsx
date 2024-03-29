import { Routes, Route, Navigate } from "react-router-dom";
import BaseLayout from "./routes/base_routes/BaseLayout";
import Login from "./routes/base_routes/switchable/Login";
import SignUp from "./routes/base_routes/switchable/SignUp";
import "./app.css"
import React, { useEffect, Suspense, lazy } from "react";
import HomeLayout from "./routes/home_routes/HomeLayout";
import { useSelector } from "react-redux";
import { getUser } from "./features/user/authSlice";
import EventsPage from "./routes/home_routes/switchable/events/EventsPage";
import MyWorkoutsPage from "./routes/home_routes/switchable/myWorkouts/MyWorkoutsPage";
import "./app.css"
import EventsLayout from "./routes/home_routes/EventsLayout";
import CreateEvent from "./routes/home_routes/switchable/events/CreateEvent";
import ViewWorkoutLoadingPage from "./components/loaders/pages/ViewWorkoutLoadingPage";
import ViewEventLoadingPage from "./components/loaders/pages/ViewEventLoadingPage";
import CreateWorkout from "./routes/home_routes/switchable/myWorkouts/CreateWorkout";
import GlobalLoadingPage from "./components/loaders/pages/GlobalLoadingPage";
import WelcomeLoadingPage from "./components/loaders/pages/WelcomeLoadingPage";
import BaseLayoutLoadingPage from "./components/loaders/layouts/BaseLayoutLoadingPage";

type Props = {};

// #region : view workout

const ViewWorkoutLoadable = (Component: React.FC) => (props: any) => {
  return (
    <Suspense fallback={<ViewWorkoutLoadingPage />}>
      <Component {...props} />
    </Suspense>
  );
}

const ViewWorkout = ViewWorkoutLoadable(
  lazy(() => import("./routes/home_routes/switchable/myWorkouts/ViewWorkout"))
)
// #endregion

// #region : welcome page loadable
const WelomePageLoadable = (Component: React.FC) => (props: any) => {
  return (
    <Suspense fallback={<WelcomeLoadingPage />}>
      <Component {...props} />
    </Suspense>
  )
}

const Welcome = WelomePageLoadable(
  lazy(() => import("./routes/base_routes/switchable/Welcome"))
)

// #endregion

// #region : global loadable
const GlobalLoadable = (Component: React.FC) => (props: any) => {
  return (
    <Suspense fallback={<GlobalLoadingPage />}>
      <Component {...props} />
    </Suspense>
  )
}

const GlobalPage = GlobalLoadable(
  lazy(() => import("./routes/home_routes/switchable/GlobalPage"))
)

// #endregion

// #region : view events loader

const viewEventLoadable = (Component: React.FC) => (props: any) => {
  return <Suspense fallback={<ViewEventLoadingPage />}>
    <Component {...props} />
  </Suspense>
}

const ViewEvent = viewEventLoadable(
  lazy(() => import("./routes/home_routes/switchable/events/ViewEvent"))
)

// #endregion


const App = (props: Props) => {
  // declaration
  const user = useSelector(getUser)

  // side-effects

  return (
    <div className="relative w-[100vw] h-[100vh]">
      <Routes>

        {/* home routes */}
        {
          user.isUser && (
            <Route path="/home/" element={<HomeLayout />}>
              <Route index element={<Navigate to="/home/global" />} />
              <Route path="global" element={<GlobalPage />} />

              {/* events route */}
              <Route path="events" element={<EventsLayout />}>
                <Route index element={<EventsPage />} />
                <Route path="view/:id" element={<ViewEvent />} />
                <Route path="create" element={<CreateEvent />} />
              </Route>

              {/* workout routes */}
              <Route path="my_workouts">
                <Route index element={<MyWorkoutsPage />} />
                <Route path={":id"} element={<ViewWorkout />} />
                <Route path="create" element={<CreateWorkout />} />
              </Route>
            </Route>

          )
        }

        {/* root routes */}
        <Route path="/" element={!user.isUser ? <BaseLayout /> : <Navigate to={"/home/global"} />}>
          {/* <Route index element={<Welcome />} /> */}
          <Route index element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* handling other routes */}
        <Route path="/*" element={<Navigate to={user.isUser ? "/home" : "/"} />} />
      </Routes>
    </div>
  );
};

export default App;
