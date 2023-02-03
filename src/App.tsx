import { Routes, Route } from "react-router-dom";
import BaseLayout from "./routes/base_routes/BaseLayout";
import Login from "./routes/base_routes/switchable/Login";
import SignUp from "./routes/base_routes/switchable/SignUp";
import Welcome from "./routes/base_routes/switchable/Welcome";
import "./app.css"
import { useEffect } from "react";

type Props = {};

const App = (props: Props) => {

  // side-effects
  // to get the process
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
