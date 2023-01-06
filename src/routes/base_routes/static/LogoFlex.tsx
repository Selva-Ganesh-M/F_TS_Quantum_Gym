import { Outlet } from "react-router-dom";
import transperant from "@/assets/transperant.png";

type Props = {};

const LogoFlex = (props: Props) => {
  return (
    <section className="md:w-full md:h-[97vh] md:items-center md:px-20 md:pt-24 md:pb-10 md:flex md:flex-row">
      <Outlet />
      {/* logo section */}
      <div className="basis-1/2">
        <img src={transperant} alt="quantum-gym-logo" />
      </div>
    </section>
  );
};

export default LogoFlex;
