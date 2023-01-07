import { ERootPageAction, ERootPages } from "@/context/RootPageContext";
import useRootPageContext from "@/hooks/useRootPageContext";
import { useEffect } from "react";

type Props = {};

const Login = (props: Props) => {
  const { state, dispatch } = useRootPageContext({});
  useEffect(() => {
    dispatch({
      action: ERootPageAction.change,
      payload: ERootPages.login,
    });
  }, []);
  return <div>Login</div>;
};

export default Login;
