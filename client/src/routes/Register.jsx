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
import { Logo } from "../components/Logo";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/useSignup";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const signup = useSignup();

  const onSubmit = (data) => {
    signup.mutate(data);
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
              Create your account
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={1}>
                {signup.isError && (
                  <Alert status="error" borderRadius={8} mb={2}>
                    <AlertIcon />
                    {signup.error?.response?.data?.message
                      ? signup.error.response.data.message
                      : "Something went wrong!"}
                  </Alert>
                )}
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register("username")}
                  />
                </FormControl>
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
                  isLoading={signup.isLoading}
                >
                  Create Account
                </Button>
                <Text textAlign="center" fontSize="md">
                  Already Have an Account?&nbsp;
                  <Button
                    colorScheme="teal"
                    variant="link"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
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

export default Register;
