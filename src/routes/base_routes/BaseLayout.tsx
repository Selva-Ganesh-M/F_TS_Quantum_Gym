import LogoFlex from "./static/LogoFlex";
import Navbar from "./static/Navbar";
import { useState } from "react";

type Props = {};

export enum selPageRR {
  login = "login",
  signup = "signup",
  welcome = "welcome",
}

const BaseLayout = (props: Props) => {
  const [selectedPage, setSelectedPage] = useState<selPageRR>(
    selPageRR.welcome
  );
  return (
    <>
      <Navbar />
      <LogoFlex />
    </>
  );
};

export default BaseLayout;
