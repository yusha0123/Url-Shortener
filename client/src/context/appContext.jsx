import { createContext, useEffect, useReducer, useState } from "react";
import Loading from "../components/Loading";

export const AppContext = createContext();

export const appReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
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

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      dispatch({
        type: "LOGIN",
        payload: token,
      });
    }

    setLoading(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {isLoading ? <Loading /> : children}
    </AppContext.Provider>
  );
};
