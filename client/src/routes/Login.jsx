import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  Img,
  Icon,
} from "@chakra-ui/react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import { Logo } from "../components/Logo";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const login = useLogin();

  const onSubmit = (data) => {
    login.mutate(data);
  };
  return (
    <>
      <Box
        position="fixed"
        top={0}
        right={0}
        left={0}
        my={2}
        display="flex"
        justifyContent="center"
      >
        <Link to={"/"}>
          <Logo />
        </Link>
      </Box>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg="gray.200">
        <Box
          rounded={"lg"}
          bg="white"
          boxShadow={"lg"}
          p={6}
          minW={{
            lg: "400px",
          }}
          w={["90%", "65%", "50%", "40%", "25%"]}
          maxW={"576px"}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%" }}
          >
            <Heading fontSize={"2xl"} textAlign="center" mb={6}>
              Sign in to your account
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={1}>
                {login.isError && (
                  <Alert status="error" borderRadius={8} mb={2}>
                    <AlertIcon />
                    {login.error?.response?.data?.message
                      ? login.error.response.data.message
                      : "Something went wrong!"}
                  </Alert>
                )}
                <FormControl isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    autoComplete="off"
                    {...register("email")}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                      {...register("password")}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? (
                          <Icon as={BiSolidShow} />
                        ) : (
                          <Icon as={BiSolidHide} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
              <Stack spacing={3} mt={3}>
                <Button
                  colorScheme="messenger"
                  type="submit"
                  isLoading={login.isPending}
                >
                  Continue
                </Button>
                <Text textAlign="center" fontSize="md">
                  Don't have an account?&nbsp;
                  <Button
                    colorScheme="teal"
                    variant="link"
                    onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </Button>
                </Text>
              </Stack>
            </form>
          </motion.div>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
