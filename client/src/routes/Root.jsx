import React from "react";
import { Box, Image, Heading, Button, Grid, GridItem } from "@chakra-ui/react";
import HeroImage from "../assets/HeroImage.jpg";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";

const Root = () => {
  const navigate = useNavigate();
  return (
    <section style={{ overflowX: "hidden" }}>
      <Navbar />
      <Box
        sx={{ marginTop: 5 }}
        display="flex"
        width="90%"
        height="100%"
        mx="auto"
      >
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={6}
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
              <Heading textAlign="center">
                Shorten, share and track your URLs with ease!
              </Heading>
              <Button
                colorScheme="whatsapp"
                size="lg"
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
