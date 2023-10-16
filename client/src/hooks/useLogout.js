import { useAppContext } from "./useAppContext";

export const useLogout = () => {
  const { dispatch } = useAppContext();
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };
  return { logout };
};
