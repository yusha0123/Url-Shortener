import { useContext } from "react";
import { AppContext } from "../context/appContext";

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw error("useAppContext must be used inside an App Context Provider!");
  }

  return context;
};
