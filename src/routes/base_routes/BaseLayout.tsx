import { Outlet } from "react-router-dom";
import Navbar from "./static/Navbar";

type Props = {};

const BaseLayout = (props: Props) => {
  return (
    <>
      <Navbar />
      <Outlet />;
    </>
  );
};

export default BaseLayout;
