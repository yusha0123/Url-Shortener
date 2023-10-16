import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import Loading from "./components/Loading";
import { useAppContext } from "./hooks/useAppContext";

const App = () => {
  const Root = lazy(() => import("./routes/Root"));
  const Home = lazy(() => import("./routes/Home"));
  const Login = lazy(() => import("./routes/Login"));
  const Register = lazy(() => import("./routes/Register"));
  const NotFound = lazy(() => import("./routes/NotFound"));
  const { user } = useAppContext();

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          <Route element={<PublicRoute user={user} />}>
            <Route element={<Root />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
          </Route>
          <Route element={<PrivateRoute user={user} />}>
            <Route element={<Home />} path="/home" />
          </Route>
          <Route element={<NotFound />} path="*" />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
