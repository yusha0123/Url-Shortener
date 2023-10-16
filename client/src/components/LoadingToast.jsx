import React from "react";
import { Alert, AlertTitle, Box, Spinner } from "@chakra-ui/react";

const LoadingToast = ({ message }) => {
  return (
    <Box
      position="fixed"
      top="0.5rem"
      left="50%"
      transform="translateX(-50%)"
      zIndex="9999"
    >
      <Alert status="info" variant="solid" rounded={"md"}>
        <Spinner color="white" />
        <AlertTitle mx={3}>{message}</AlertTitle>
      </Alert>
    </Box>
  );
};

export default LoadingToast;
