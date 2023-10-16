import React from "react";
import { Heading, Icon } from "@chakra-ui/react";
import { BiLink } from "react-icons/bi";

export const Logo = () => {
  return (
    <Heading
      as="h1"
      size={"lg"}
      color={"pink.500"}
      display={"flex"}
      alignItems={"center"}
    >
      <Icon as={BiLink} /> TinyLink
    </Heading>
  );
};
