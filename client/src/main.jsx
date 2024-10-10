import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { AppContextProvider } from "./context/appContext";
import ModalProvider from "./components/modals/ModalProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider
      toastOptions={{
        defaultOptions: { position: "top", isClosable: true, duration: 5000 },
      }}
    >
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ModalProvider />
        </QueryClientProvider>
      </AppContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
