import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Details from "../components/Details";
import { Navbar } from "../components/Navbar";
import UrlTable from "../components/UrlTable";
import { useAppContext } from "../hooks/useAppContext";
import { useErrorHandler } from "../hooks/useErrorHandler";

const Home = () => {
  const toast = useToast();
  const { register, handleSubmit, reset } = useForm();
  const [show, setShow] = useState(false);
  const { user } = useAppContext();
  const { errorHandler } = useErrorHandler();
  const queryClient = useQueryClient();

  const shorten = useMutation({
    mutationFn: async (input) => {
      const { data } = await axios.post("/api/tinylink/", input, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      setShow(true);
      reset();
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
    onError: (error) => {
      if (error.response?.data?.invalidUrl) {
        return toast({
          title: "Please enter a Valid URL!",
          status: "error",
        });
      }
      errorHandler(error);
    },
  });

  const { data: userData, isLoading } = useQuery({
    queryKey: ["urls"],
    queryFn: async () => {
      const { data } = await axios.get("/api/tinylink", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return data;
    },
    onError: (error) => {
      errorHandler(error);
    },
    retry: 0,
  });

  const liftState = () => {
    setShow(false);
  };

  const onSubmit = (data) => {
    shorten.mutate(data);
  };

  return (
    <>
      <Navbar />
      <VStack spacing={4} mt={5} mb={10}>
        {!show && (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ ease: "easeOut" }}
            style={{ width: "100%" }}
          >
            <Box
              rounded={"lg"}
              bg={"white"}
              boxShadow={"md"}
              p={6}
              mx={"auto"}
              maxW={"767px"}
              w={["90%", "75%", "65%", "50%", "40%"]}
            >
              <Heading
                fontSize={{
                  base: "xl",
                  md: "2xl",
                }}
                mb={3}
                textAlign={"center"}
              >
                Paste the URL to be shortened
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={3}>
                  <FormControl isRequired>
                    <Input
                      autoComplete="off"
                      placeholder="Your URL here"
                      size={{
                        base: "sm",
                        md: "md",
                      }}
                      {...register("redirectUrl")}
                    />
                  </FormControl>
                  <Button
                    colorScheme="gray"
                    width={"40%"}
                    type="submit"
                    size={{
                      base: "sm",
                      md: "md",
                    }}
                    isLoading={shorten.isLoading}
                  >
                    Shorten
                  </Button>
                </VStack>
              </form>
            </Box>
          </motion.div>
        )}
        {show && (
          <Details
            longUrl={shorten.data.LongUrl}
            shortUrl={shorten.data.shortUrl}
            liftState={liftState}
          />
        )}
        {userData?.length > 0 && (
          <UrlTable data={userData} liftState={liftState} />
        )}
      </VStack>
      {isLoading && (
        <Center mt={"5rem"}>
          <Spinner size={"lg"} />
        </Center>
      )}
    </>
  );
};

export default Home;
