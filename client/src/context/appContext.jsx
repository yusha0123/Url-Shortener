import { createContext, useEffect, useReducer } from "react";

export const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: { token: action.payload } };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch({
        type: "LOGIN",
        payload: token,
      });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
