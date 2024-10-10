import React, { Suspense, lazy } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading";
import { useAppContext } from "./hooks/useAppContext";
import PublicRoute from "./components/hoc/PublicRoute";
import PrivateRoute from "./components/hoc/PrivateRoute";

const App = () => {
  const Root = lazy(() => import("./pages/Root"));
  const Home = lazy(() => import("./pages/Home"));
  const Login = lazy(() => import("./pages/Login"));
  const Register = lazy(() => import("./pages/Register"));
  const NotFound = lazy(() => import("./pages/NotFound"));
  const { user } = useAppContext();

  if (!import.meta.env.PROD) {
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_ADDRESS;
  }

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
