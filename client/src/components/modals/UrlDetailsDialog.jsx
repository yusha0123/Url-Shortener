import {
  Button,
  Divider,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Text,
  Tooltip,
  useBreakpointValue,
  useClipboard,
} from "@chakra-ui/react";
import React from "react";
import { BsClipboardFill, BsFillClipboardCheckFill } from "react-icons/bs";
import { modalTypes } from "../../constants";
import useModalStore from "../../hooks/useModalStore";

const UrlDetailsDialog = () => {
  const modalSize = useBreakpointValue({ base: "xs", md: "md", xl: "xl" });
  const { isOpen, type, onClose, data } = useModalStore();
  const { onCopy: copyShortUrl, hasCopied: copiedShortUrl } = useClipboard(
    data?.shortUrl
  );
  const { onCopy: copyLongUrl, hasCopied: copiedLongUrl } = useClipboard(
    data?.longUrl
  );

  return (
    <Modal
      isOpen={isOpen && type === modalTypes.DETAILS}
      onClose={onClose}
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Your Shortened Url</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Text>Long URL:</Text>
          <InputGroup>
            <Input
              variant="outline"
              value={data?.longUrl}
              readOnly
              size={{
                base: "sm",
                md: "md",
              }}
            />
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
            <Input
              variant="outline"
              value={data?.shortUrl}
              readOnly
              size={{
                base: "sm",
                md: "md",
              }}
            />
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
                      copiedShortUrl
                        ? BsFillClipboardCheckFill
                        : BsClipboardFill
                    }
                  />
                </Button>
              </Tooltip>
            </InputRightElement>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UrlDetailsDialog;
