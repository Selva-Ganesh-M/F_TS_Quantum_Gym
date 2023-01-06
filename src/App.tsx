import { Routes, Route } from "react-router-dom";
import BaseLayout from "./routes/base_routes/BaseLayout";
import Welcome from "./routes/base_routes/switchable/Welcome";

type Props = {};

const App = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Welcome />} />
      </Route>
    </Routes>
  );
};

export default App;
