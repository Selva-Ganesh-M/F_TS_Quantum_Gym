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
        className=" lg:p-6 items-center justify-center
       md:text-start h-[89vh]
       basis-1/2 flex flex-col "
      >
        <div className=" flex flex-col items-start">
          {/* content */}
          <div>

            <h1 className="text-[36px] text-bold text-slate-900 mb-3">
              Quantum Gym
            </h1>
            <p>One stop for all workout collections and events.</p>
          </div>


          {/* actions */}
          <div>
            <div className="actions flex justify-center items-center gap-5 mt-10">

              {/* login */}
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

              {/* sign up */}
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

              {/* google */}
              <div className=" hover:text-white scale-[1.2] ">
                <OutlineBtn className="hover:text-white" px="px-[14px]" rounded="rounded-full" width="w-max" content={<GoogleButton variant="sm" />} onClick={() => handleSignInWithGoogle({ dispatch })} />
              </div>


            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Welcome;
