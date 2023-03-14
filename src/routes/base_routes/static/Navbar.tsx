import useMediaQuery from "@/hooks/useMediaQuery";
import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import transperant from "@/assets/transperant.png";
import { motion, AnimatePresence } from "framer-motion";
import FilledBtn from "@/components/shared/FilledBtn";
import useRootPageContext from "@/hooks/useRootPageContext";
import { ERootPageAction, ERootPages } from "@/context/RootPageContext";
import { useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdOutlineHelpOutline } from "react-icons/md";
import { MdGroups } from "react-icons/md"
import OutlineBtn from "@/components/shared/OutlineBtn";

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const { state, dispatch } = useRootPageContext({});
  const isLargeScreen = useMediaQuery("(min-width:769px)");
  const [isMenuToggled, setIsMenuToggled] = useState<Boolean>(false);

  return (
    // Navbar
    <div
      className="sticky top-0 w-[100vw] shadow-md bg-white px-3 py-3 flex justify-between items-center
    sm:px-10
    md:px-20
    z-[999]
     "
    >
      {/* RIGHT */}
      {/* logo */}
      <img
        onClick={() => navigate("/")}
        src={transperant}
        alt="logo"
        width={"90px"}
        className={`${isLargeScreen ? "order-1" : "order-2"} cursor-pointer`}
      />

      {/* LEFT */}
      {/* responsive nav section */}
      <div className={`${isLargeScreen ? "order-2" : "order-1"}`}>
        {isLargeScreen ? (
          // {/* nav items - Large Screens */}
          <nav>
            <ul className="flex gap-5 text-sm md:gap-10 items-center">
              <li>About Us</li>
              <li>Help</li>
              {state?.rootCurrentPage === "login" ? (
                <li
                  onClick={() =>
                    dispatch({
                      action: ERootPageAction.change,
                      payload: ERootPages.login,
                    })
                  }
                >
                  <FilledBtn to="/signup" content="signup" />
                </li>
              ) : null}
              {state?.rootCurrentPage === "signup" ? (
                <li
                  onClick={() =>
                    dispatch({
                      action: ERootPageAction.change,
                      payload: ERootPages.signup,
                    })
                  }
                >
                  <FilledBtn to="/login" content="login" />
                </li>
              ) : null}
            </ul>
          </nav>
        ) : (
          <>
            {isMenuToggled ? (
              // if menu toggled
              <motion.nav
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.25 }}
                className="menu absolute top-0 left-0 h-[100vh] py-5 px-4  w-[250px] xs:p-5 bg-pink-900 z-[999]"
              >

                <div className='bg-white py-1 px-1 rounded-b-lg flex items-center gap-4 font-bold text-gray-600'>
                  <AiFillCloseCircle className='text-white cursor-pointer rounded-full w-[40px] h-[40px]'
                    onClick={() => setIsMenuToggled(false)} />
                  Quantum Gym
                  {/* <GiHamburgerMenu className='h-[40px] w-[40px] ' color='#fff' onClick={() => setSidebarOpen(true)} /> */}
                </div>

                {/* section-1 */}
                <div
                  className='bg-white my-5 rounded-t-xl hover:rounded-t-xl'>
                  <div
                    className='p-2 hover:bg-slate-100 flex items-center gap-3 text-md rounded-t-xl'>
                    <MdGroups size={20} />
                    About Us
                  </div>
                  <div
                    className='p-2 hover:bg-slate-100 flex items-center gap-3 text-md'>
                    <MdOutlineHelpOutline size={20} />
                    Help
                  </div>
                </div>

                {/* actions */}
                {state?.rootCurrentPage === "login" ? (
                  <div
                    onClick={() => {
                      dispatch({
                        action: ERootPageAction.change,
                        payload: ERootPages.login,
                      })
                      setIsMenuToggled(false)
                    }
                    }
                  >
                    <OutlineBtn to="/signup" content="signup" className="text-white border-gray-100" />
                  </div>
                ) : null}
                {state?.rootCurrentPage === "signup" ? (
                  <div
                    onClick={() => {
                      dispatch({
                        action: ERootPageAction.change,
                        payload: ERootPages.signup,
                      })
                      setIsMenuToggled(false)
                    }

                    }
                  >
                    <OutlineBtn to="/login" content="login" className="text-white border-gray-100" />
                  </div>
                ) : null}

              </motion.nav>
            ) : (
              // if menu not toggled
              <button onClick={() => setIsMenuToggled(true)}>
                <Bars3Icon width={"40px"} height={"40px"} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
