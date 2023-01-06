import { Routes, Route } from "react-router-dom";
import BaseLayout from "./routes/base_routes/BaseLayout";
import Login from "./routes/base_routes/switchable/Login";
import Welcome from "./routes/base_routes/switchable/Welcome";

type Props = {};

const App = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Welcome />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
