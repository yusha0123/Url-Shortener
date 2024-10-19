import { ReactNode, StrictMode, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { urls } from "@/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const queryClient = new QueryClient();
  const navigate = useNavigate();

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

  return (
    <StrictMode>
      <NextUIProvider navigate={navigate}>
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
        </QueryClientProvider>
      </NextUIProvider>
    </StrictMode>
  );
};

const ProviderWrapper = () => (
  <AppProvider>
    <Outlet />
  </AppProvider>
);

export { AppProvider, ProviderWrapper };
