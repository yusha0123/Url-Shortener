import React from "react";
import {
  Input,
  Box,
  InputRightElement,
  Text,
  InputGroup,
  Button,
  Icon,
  useClipboard,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BsFillClipboardCheckFill, BsClipboardFill } from "react-icons/bs";

const Details = ({ longUrl, shortUrl, liftState }) => {
  const { onCopy: copyShortUrl, hasCopied: copiedShortUrl } =
    useClipboard(shortUrl);
  const { onCopy: copyLongUrl, hasCopied: copiedLongUrl } =
    useClipboard(longUrl);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ width: "100%" }}
    >
      <Box
        rounded={"lg"}
        bg={"white"}
        boxShadow={"md"}
        p={5}
        mx={"auto"}
        w={{ base: "90%", md: "70%", lg: "50%" }}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        alignItems={"center"}
      >
        <Text>Long URL:</Text>
        <InputGroup>
          <Input variant="outline" value={longUrl} readOnly />
          <InputRightElement h={"full"}>
            <Tooltip
              label={copiedLongUrl ? "Copied!" : "Copy"}
              fontSize="sm"
              hasArrow
              placement="top"
            >
              <Button variant={"ghost"} onClick={copyLongUrl}>
                <Icon
                  as={
                    copiedLongUrl ? BsFillClipboardCheckFill : BsClipboardFill
                  }
                />
              </Button>
            </Tooltip>
          </InputRightElement>
        </InputGroup>
        <Text>Short URL:</Text>
        <InputGroup>
          <Input variant="outline" value={shortUrl} readOnly />
          <InputRightElement h={"full"}>
            <Tooltip
              label={copiedShortUrl ? "Copied!" : "Copy"}
              fontSize="sm"
              hasArrow
              placement="top"
            >
              <Button variant={"ghost"} onClick={copyShortUrl}>
                <Icon
                  as={
                    copiedShortUrl ? BsFillClipboardCheckFill : BsClipboardFill
                  }
                />
              </Button>
            </Tooltip>
          </InputRightElement>
        </InputGroup>
        <Button colorScheme="blue" onClick={liftState}>
          Shorten another URL
        </Button>
      </Box>
    </motion.div>
  );
};

export default Details;
