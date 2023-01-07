import LogoFlex from "./static/LogoFlex";
import Navbar from "./static/Navbar";
import RootPageContextProvider from "@/context/RootPageContext";
import useRootPageContext from "@/hooks/useRootPageContext";
import { ERootPages } from "@/context/RootPageContext";
import { ERootPageAction } from "@/context/RootPageContext";

type Props = {};

const BaseLayout = (props: Props) => {
  const { state, dispatch } = useRootPageContext({});
  dispatch({
    action: ERootPageAction.change,
    payload: ERootPages.signup,
  });

  return (
    <RootPageContextProvider>
      <Navbar />
      <LogoFlex />
    </RootPageContextProvider>
  );
};

export default BaseLayout;
