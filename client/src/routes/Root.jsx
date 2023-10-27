import React from "react";
import { Box, Image, Heading, Button, Grid, GridItem } from "@chakra-ui/react";
import HeroImage from "../assets/HeroImage.webp";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";

const Root = () => {
  const navigate = useNavigate();
  return (
    <section style={{ overflowX: "hidden", width: "100%", minHeight: "100vh" }}>
      <Navbar />
      <Box
        mx="auto"
        width={{
          base: "95%%",
          sm: "95",
          md: "90%",
          lg: "85%",
        }}
        maxW={"1024px"}
        mt={6}
      >
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{
            base: 2,
            md: 4,
            lg: 6,
          }}
          height={"100%"}
          justifyContent="center"
          alignItems="center"
        >
          <GridItem>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
                alignItems: "center",
              }}
            >
              <Heading
                textAlign={"center"}
                size={{
                  base: "md",
                  sm: "lg",
                  sm: "xl",
                }}
              >
                Effortlessly Condense, Share, and Monitor Your URLs!
              </Heading>
              <Button
                colorScheme="whatsapp"
                size={{
                  base: "sm",
                  sm: "md",
                  lg: "lg",
                }}
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
            </motion.div>
          </GridItem>
          <GridItem>
            <motion.div
              transition={{ duration: 1 }}
              initial={{
                x: "100vw",
                opacity: 0,
              }}
              animate={{ x: 0, opacity: 1 }}
            >
              <Image src={HeroImage} alt="Hero image" objectFit="cover" />
            </motion.div>
          </GridItem>
        </Grid>
      </Box>
    </section>
  );
};

export default Root;
