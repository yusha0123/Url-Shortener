import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { AppContextProvider } from "./context/appContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        </QueryClientProvider>
      </AppContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
