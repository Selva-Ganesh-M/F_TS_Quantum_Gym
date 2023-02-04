import { Routes, Route, Navigate } from "react-router-dom";
import BaseLayout from "./routes/base_routes/BaseLayout";
import Login from "./routes/base_routes/switchable/Login";
import SignUp from "./routes/base_routes/switchable/SignUp";
import Welcome from "./routes/base_routes/switchable/Welcome";
import "./app.css"
import { useEffect } from "react";
import HomeLayout from "./routes/home_routes/HomeLayout";
import HomePage from "./routes/home_routes/switchable/HomePage";
import { useSelector } from "react-redux";
import { getUser } from "./features/user/authSlice";

type Props = {};

const App = (props: Props) => {
  // declaration
  const user = useSelector(getUser)

  // side-effects

  return (
    <div className="relative w-[100vw] h-[100vh]">
      <Routes>
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/" element={!user ? <BaseLayout /> : <Navigate to={"/home"} />}>
          <Route index element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
