import { Outlet } from "react-router-dom";
import transperant from "@/assets/transperant.png";
import useMediaQuery from "@/hooks/useMediaQuery";

type Props = {};

const LogoFlex = (props: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  return (
    <section
      className="mt-5 
      sm:w-[600px] sm:m-auto
    md:w-full md:items-center md:px-20 md:flex md:flex-row
    "
    >
      {/* OUTLET ITEM */}
      <Outlet />

      {/* LOGO ITEM */}
      {isAboveMediumScreens ? (
        // {/* logo section */}
        <div className="basis-1/2">
          <img
            src={transperant}
            alt="quantum-gym-logo"
            // className="absolute top-0"
          />
        </div>
      ) : null}
    </section>
  );
};

export default LogoFlex;
