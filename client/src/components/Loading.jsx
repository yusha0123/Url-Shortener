import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex h={"100vh"} align={"center"} justify={"center"}>
      <Spinner
        size="xl"
        thickness="4px"
        speed="0.60s"
        emptyColor="gray.200"
        color="gray.500"
      />
    </Flex>
  );
};

export default Loading;
