import { createContext, Dispatch, useContext, useReducer } from "react";

// CONTEXT PREP

export enum ERootPages {
  welcome = "welcome",
  login = "login",
  signup = "signup",
}

export type TRootPageState = {
  rootCurrentPage: ERootPages;
};

export type TRootPageContext = {
  state: TRootPageState | null;
  dispatch: Dispatch<TRootPageReducerActions>;
};

export const RootPageContext = createContext<TRootPageContext>({
  state: {
    rootCurrentPage: ERootPages.welcome,
  },
  dispatch: (value: TRootPageReducerActions) => null,
});

type Props = {
  children: React.ReactNode;
};



// REDUCER PREP

export enum ERootPageAction {
  change = "change",
}

export type TRootPageReducerActions = {
  action: ERootPageAction;
  payload: ERootPages;
};

export const RootPageReducer = (
  state: TRootPageState,
  action: TRootPageReducerActions
): TRootPageState => {
  switch (action.payload) {
    case ERootPages.welcome:
      return {
        rootCurrentPage: ERootPages.welcome,
      };
    case ERootPages.login:
      return {
        rootCurrentPage: ERootPages.login,
      };
    case ERootPages.signup:
      return {
        rootCurrentPage: ERootPages.signup,
      };
  }
};


// component prep
const RootPageContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(RootPageReducer, {
    rootCurrentPage: ERootPages.welcome,
  });
  return (
    <RootPageContext.Provider value={{ state, dispatch }}>
      {children}
    </RootPageContext.Provider>
  );
};

export default RootPageContextProvider;
