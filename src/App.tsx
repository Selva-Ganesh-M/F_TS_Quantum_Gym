import { Routes, Route, Navigate } from "react-router-dom";
import BaseLayout from "./routes/base_routes/BaseLayout";
import Login from "./routes/base_routes/switchable/Login";
import SignUp from "./routes/base_routes/switchable/SignUp";
import Welcome from "./routes/base_routes/switchable/Welcome";
import "./app.css"
import { useEffect } from "react";
import HomeLayout from "./routes/home_routes/HomeLayout";
import { useSelector } from "react-redux";
import { getUser } from "./features/user/authSlice";
import GlobalPage from "./routes/home_routes/switchable/GlobalPage";
import EventsPage from "./routes/home_routes/switchable/events/EventsPage";
import MyWorkoutsPage from "./routes/home_routes/switchable/MyWorkoutsPage";
import "./app.css"
import EventsLayout from "./routes/home_routes/EventsLayout";
import ViewEvent from "./routes/home_routes/switchable/events/ViewEvent";

type Props = {};

const App = (props: Props) => {
  // declaration
  const user = useSelector(getUser)

  // side-effects

  return (
    <div className="relative w-[100vw] h-[100vh]">
      <Routes>
        {/* home routes */}
        <Route path="/home/" element={<HomeLayout />}>
          <Route index element={<Navigate to="/home/global" />} />
          <Route path="global" element={<GlobalPage />} />

          {/* events route */}
          <Route path="events" element={<EventsLayout />}>
            <Route index element={<EventsPage />} />
            <Route path="view/:id" element={<ViewEvent />} />
          </Route>
          <Route path="my_workouts" element={<MyWorkoutsPage />} />
        </Route>

        {/* root routes */}
        <Route path="/" element={!user.isUser ? <BaseLayout /> : <Navigate to={"/home/global"} />}>
          <Route index element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
