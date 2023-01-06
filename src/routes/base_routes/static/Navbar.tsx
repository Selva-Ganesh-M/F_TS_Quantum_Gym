import useMediaQuery from "@/hooks/useMediaQuery";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import transperant from "@/assets/transperant.png";
import { motion, AnimatePresence } from "framer-motion";
type Props = {};

const Navbar = (props: Props) => {
  const isLargeScreen = useMediaQuery("(min-width:769px)");
  const [isMenuToggled, setIsMenuToggled] = useState<Boolean>(false);
  return (
    // Navbar
    <div
      className="fixed w-[100vw] shadow-md bg-white px-3 py-3 flex justify-between items-center
    sm:px-10
    md:px-20
     "
    >
      {/* RIGHT */}
      {/* logo */}
      <img
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
            <ul className="flex gap-5 text-sm md:gap-10">
              <li>About Us</li>
              <li>Help</li>
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
                className="menu absolute top-0 left-0 h-full py-5 px-4  w-[200px] xs:w-[300px] xs:pl-20 xs:p-5 sm:w-[350px] bg-rose-300"
              >
                <XMarkIcon
                  onClick={() => setIsMenuToggled(false)}
                  width={"40px"}
                  height={"40px"}
                  className={"mb-5"}
                />
                <ul className="font-bold text-lg flex flex-col gap-3">
                  <li className="">About Us</li>
                  <li>Help</li>
                </ul>
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
