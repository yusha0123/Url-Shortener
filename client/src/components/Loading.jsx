import React from "react";
import { CircularProgress, Flex } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex h={"100vh"} align={"center"} justify={"center"}>
      <CircularProgress isIndeterminate color="green.300" />
    </Flex>
  );
};

export default Loading;
