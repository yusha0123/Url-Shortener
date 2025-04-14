import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PrivateRoute from "./components/hoc/PrivateRoute";
import PublicRoute from "./components/hoc/PublicRoute";
import Loading from "./components/Loading";
import { urls } from "./constants";
import { ProviderWrapper } from "./providers";

const App = () => {
  const Dashboard = lazy(() => import("./pages/Dashboard"));
  const NotFound = lazy(() => import("./pages/NotFound"));
  const Root = lazy(() => import("./pages/Root"));
  const Login = lazy(() => import("./pages/Login"));
  const Register = lazy(() => import("./pages/Register"));

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<ProviderWrapper />}>
        <Route element={<PublicRoute />}>
          <Route path={urls.root.route} element={<Root />} />
          <Route path={urls.login.route} element={<Login />} />
          <Route path={urls.register.route} element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path={urls.dashboard.route} element={<Dashboard />} />
        </Route>
        <Route
          path={urls.notFound.route}
          element={
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
