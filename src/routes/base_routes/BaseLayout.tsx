import { Outlet } from "react-router-dom";
import LogoFlex from "./static/LogoFlex";
import Navbar from "./static/Navbar";

type Props = {};

const BaseLayout = (props: Props) => {
  return (
    <>
      <Navbar />
      <LogoFlex />
    </>
  );
};

export default BaseLayout;
