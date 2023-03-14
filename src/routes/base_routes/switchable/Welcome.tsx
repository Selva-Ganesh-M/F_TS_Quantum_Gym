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
import useMediaQuery from "@/hooks/useMediaQuery";

type Props = {};

const Welcome = (props: Props) => {
  //#region : grabbing
  const navigate = useNavigate();
  const { state, dispatch: rootDispatch } = useRootPageContext({});
  const dispatch = useDispatch()
  //#endregion

  //#region : custom-declarations
  const isGButtonFull = useMediaQuery("(max-width:950px)")
  //#endregion

  //#region : side-effects
  useEffect(() => {
    rootDispatch({
      action: ERootPageAction.change,
      payload: ERootPages.welcome,
    });
  }, []);

  //#endregion

  //#region : functions

  //#endregion

  //jsx rendering

  return (
    <>
      {/* welcome section */}
      <div
        className=" lg:p-6 items-center justify-center
       md:text-start h-[89vh]
       basis-1/2 flex flex-col p-5"
      >
        <div className=" flex flex-col items-start">

          {/* content */}
          <div>

            <h1 className="text-center text-[36px] text-bold text-slate-900 mb-3">
              Quantum Gym
            </h1>
            <p className="text-center">One stop for all workout collections and events.</p>
          </div>


          {/* actions */}
          <div className={`actions flex justify-center gap-5 mt-10 ${isGButtonFull && "flex-col"} m-auto`}>

            <div className="flex gap-2 sm:gap-5 sm:flex-row"  >
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

            </div>


            {/* google */}
            <div className=" hover:text-white m-auto">
              {
                // ifGButtonFull{
                isGButtonFull ? (
                  <OutlineBtn className="hover:text-white" px="px-[14px]" rounded="rounded-lg" width="w-max" content={<GoogleButton variant="" />} onClick={() => handleSignInWithGoogle({ dispatch })} />
                ) : (

                  <OutlineBtn className="hover:text-white" px="px-[14px]" rounded="rounded-full" width="w-max" content={<GoogleButton variant="sm" />} onClick={() => handleSignInWithGoogle({ dispatch })} />
                )
              }
            </div>


          </div>

        </div>
      </div>
    </>
  );
};

export default Welcome;
