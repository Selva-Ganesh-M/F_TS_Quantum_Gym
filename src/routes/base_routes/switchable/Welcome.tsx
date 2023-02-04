import FilledBtn from "@/components/shared/FilledBtn";
import OutlineBtn from "@/components/shared/OutlineBtn";
import { ERootPageAction, ERootPages } from "@/context/RootPageContext";
import useRootPageContext from "@/hooks/useRootPageContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import GoogleButton from "@/components/GoogleButton";
import { handleSignInWithGoogle } from "@/googleAuth/googleAuth";
import { useDispatch } from "react-redux";

type Props = {};

const Welcome = (props: Props) => {
  const navigate = useNavigate();
  const { state, dispatch: rootDispatch } = useRootPageContext({});
  const dispatch = useDispatch()
  useEffect(() => {
    rootDispatch({
      action: ERootPageAction.change,
      payload: ERootPages.welcome,
    });
  }, []);
  return (
    <>
      {/* welcome section */}
      <div
        className=" lg:p-6
        justify-center items-center text-center md:text-start h-[89vh]
       basis-1/2 flex flex-col "
      >
        <div>
          {/* content */}

          <h1 className="text-[36px] text-bold text-slate-900 mb-3">
            Quantum Gym
          </h1>
          <p>One stop for all workout collections and events.</p>


          {/* actions */}
          <div>
            <div className="actions flex justify-center gap-5 mt-10">
              <Link
                to="/login"
                onClick={() =>
                  rootDispatch({
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
                  rootDispatch({
                    action: ERootPageAction.change,
                    payload: ERootPages.signup,
                  })
                }
              >
                <OutlineBtn content={"Sign Up"} />
              </Link>
            </div>
            <div className="mt-5 flex justify-center hover:text-white ">
              <OutlineBtn className="hover:text-white" content={<GoogleButton />} onClick={() => handleSignInWithGoogle({ dispatch })} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
