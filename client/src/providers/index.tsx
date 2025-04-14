import { ReactNode, StrictMode, useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { urls } from "@/constants";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import ModalProvider from "./ModalProvider";
import { useErrorHandler } from "@/hooks/useErrorHandler";

if (!import.meta.env.PROD) {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_ADDRESS;
}

const AppProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const errorHandler = useErrorHandler();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => errorHandler(error),
    }),
  });
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    const currentLocation = Object.values(urls).find(
      (url) => url.route === location.pathname
    );

    if (currentLocation) {
      document.title = currentLocation.title;
    } else {
      document.title = urls.notFound.title;
    }
  }, [location]);

  useEffect(() => {
    if (user) {
      const axiosInterceptor = axios.interceptors.request.use(
        (config) => {
          if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      return () => {
        axios.interceptors.request.eject(axiosInterceptor);
      };
    }
  }, [user]);

  return (
    <StrictMode>
      <HeroUIProvider navigate={navigate}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster
            toastOptions={{
              position: "top-center",
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
            }}
          />
          <ModalProvider />
        </QueryClientProvider>
      </HeroUIProvider>
    </StrictMode>
  );
};

const ProviderWrapper = () => (
  <AppProvider>
    <Outlet />
  </AppProvider>
);

export { ProviderWrapper };
