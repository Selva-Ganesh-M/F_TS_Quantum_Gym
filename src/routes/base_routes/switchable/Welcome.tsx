import FilledBtn from "@/components/shared/FilledBtn";
import OutlineBtn from "@/components/shared/OutlineBtn";
import { ERootPageAction, ERootPages } from "@/context/RootPageContext";
import useRootPageContext from "@/hooks/useRootPageContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

type Props = {};

const Welcome = (props: Props) => {
  const navigate = useNavigate();
  const { state, dispatch } = useRootPageContext({});
  useEffect(() => {
    dispatch({
      action: ERootPageAction.change,
      payload: ERootPages.welcome,
    });
  }, []);
  return (
    <>
      {/* welcome section */}
      <div
        className=" items-center text-center
       basis-1/2 flex flex-col md:items-start md:text-start"
      >
        {/* content */}

        <h1 className="text-[36px] text-bold text-slate-900 mb-3">
          Quantum Gym
        </h1>
        <p>One stop for all workout collections and events.</p>
        {/* actions */}

        <div className="actions flex gap-5 mt-10">
          <Link
            to="/login"
            onClick={() =>
              dispatch({
                action: ERootPageAction.change,
                payload: ERootPages.login,
              })
            }
          >
            <FilledBtn content={"Login"} />
          </Link>
          <Link
            to={"/signup"}
            onClick={() =>
              dispatch({
                action: ERootPageAction.change,
                payload: ERootPages.signup,
              })
            }
          >
            <OutlineBtn content={"Sign Up"} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Welcome;
