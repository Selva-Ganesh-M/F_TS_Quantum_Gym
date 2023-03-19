import { Outlet } from "react-router-dom";
import transperant from "@/assets/transperant.png";
import useMediaQuery from "@/hooks/useMediaQuery";
import BaseLayoutLoadingPage from "@/components/loaders/layouts/BaseLayoutLoadingPage";
import { Component, lazy, Suspense } from "react";

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
        <BaseLogo />
      ) : null}
    </section>
  );
};

export default LogoFlex;

// #region : base loadable

const BaseLogoLoadale = (Component: React.FC) => (props: any) => {
  return (
    <Suspense fallback={<BaseLayoutLoadingPage />}>
      <Component {...props} />
    </Suspense>
  )
}

const BaseLogo = BaseLogoLoadale(
  lazy(() => import("@/components/BaseLogo"))
)

// #endregion