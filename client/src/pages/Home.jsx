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
import { Navbar } from "../components/Navbar";
import UrlTable from "../components/UrlTable";
import { useAppContext } from "../hooks/useAppContext";
import { useErrorHandler } from "../hooks/useErrorHandler";
import useModalStore from "../hooks/useModalStore";
import { modalTypes } from "../constants";

const Home = () => {
  const toast = useToast();
  const { register, handleSubmit, reset } = useForm();
  const { errorHandler } = useErrorHandler();
  const queryClient = useQueryClient();
  const { onOpen } = useModalStore();

  const shorten = useMutation({
    mutationFn: async (input) => {
      const { data } = await axios.post("/api/tinylink/", input);
      return data;
    },
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["urls"] });

      onOpen(modalTypes.DETAILS, {
        longUrl: data?.LongUrl,
        shortUrl: data?.shortUrl,
      });
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

  const {
    data: userData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["urls"],
    queryFn: async () => {
      const { data } = await axios.get("/api/tinylink");
      return data;
    },
    retry: 0,
  });

  if (isError) {
    errorHandler(error);
  }

  const onSubmit = (data) => {
    shorten.mutate(data);
  };

  return (
    <>
      <Navbar />
      <VStack spacing={4} mt={5} mb={10}>
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
                  isLoading={shorten.isPending}
                >
                  Shorten
                </Button>
              </VStack>
            </form>
          </Box>
        </motion.div>
        {userData?.length > 0 && <UrlTable data={userData} />}
      </VStack>
      {isPending && (
        <Center mt={"5rem"}>
          <Spinner size={"lg"} />
        </Center>
      )}
    </>
  );
};

export default Home;
