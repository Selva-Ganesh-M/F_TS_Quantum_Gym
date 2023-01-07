import { useContext } from "react";
import { RootPageContext, TRootPageContext } from "@/context/RootPageContext";

type Props = {};

const useRootPageContext = (props: Props) => {
  const context = useContext<TRootPageContext>(RootPageContext);
  if (!context)
    throw new Error(
      "RootPageContext - requesting context outside of its scope."
    );
  return context;
};

export default useRootPageContext;
