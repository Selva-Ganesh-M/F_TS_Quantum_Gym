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
import EventsPage from "./routes/home_routes/switchable/EventsPage";
import MyWorkoutsPage from "./routes/home_routes/switchable/MyWorkoutsPage";

type Props = {};

const App = (props: Props) => {
  // declaration
  const user = useSelector(getUser)

  // side-effects

  return (
    <div className="relative w-[100vw] h-[100vh]">
      <Routes>
        <Route path="/home/" element={<HomeLayout />}>
          <Route path="global" element={<GlobalPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="my_workouts" element={<MyWorkoutsPage />} />
        </Route>
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
