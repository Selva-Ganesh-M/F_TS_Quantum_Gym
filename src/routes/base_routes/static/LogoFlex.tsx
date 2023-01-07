import { Outlet } from "react-router-dom";
import transperant from "@/assets/transperant.png";
import useMediaQuery from "@/hooks/useMediaQuery";

type Props = {};

const LogoFlex = (props: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  return (
    <section
      className=" pt-24
      sm:w-[600px] sm:pt-24 sm:m-auto
    md:w-full md:h-[97vh] md:items-center md:px-20 md:pt-32 md:pb-10 md:flex md:flex-row
    lg:pt-36
    "
    >
      <Outlet />
      {isAboveMediumScreens ? (
        // {/* logo section */}
        <div className="basis-1/2">
          <img src={transperant} alt="quantum-gym-logo" />
        </div>
      ) : null}
    </section>
  );
};

export default LogoFlex;
