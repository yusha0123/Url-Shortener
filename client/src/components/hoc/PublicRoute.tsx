import { Navigate, Outlet } from "react-router-dom";
import { urls } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { Suspense } from "react";
import Loading from "../Loading";

const PublicRoute = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    );
  }

  return <Navigate to={urls.dashboard.route} replace />;
};

export default PublicRoute;
