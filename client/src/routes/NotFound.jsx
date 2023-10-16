import React from "react";
import { Logo } from "../components/Logo";
import { Box, Button, Flex, Heading, Img, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        position="fixed"
        top={0}
        right={0}
        left={0}
        my={2}
        display={"flex"}
        justifyContent={"center"}
      >
        <Link to={"/"}>
          <Logo />
        </Link>
      </Box>
      <Flex
        minH={"100vh"}
        flexDirection={"column"}
        align={"center"}
        justify={"center"}
        bg="gray.200"
        gap={4}
      >
        <Heading as="h1" size="4xl">
          404
        </Heading>
        <Text as={"h2"} fontSize="2xl" mb={5}>
          Error Occured! Page could not be found
        </Text>
        <Button colorScheme="teal" onClick={() => navigate("/")}>
          Back to Homepage
        </Button>
      </Flex>
    </>
  );
};

export default NotFound;
