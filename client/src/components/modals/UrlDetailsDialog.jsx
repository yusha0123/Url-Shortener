import React from "react";
import { modalTypes } from "../../constants";
import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import useModalStore from "../../hooks/useModalStore";

const UrlDetailsDialog = () => {
  const modalSize = useBreakpointValue({ base: "xs", md: "md", xl: "xl" });
  const { isOpen, type, onClose, data } = useModalStore();

  return (
    <Modal
      isOpen={isOpen && type === modalTypes.DETAILS}
      onClose={onClose}
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Edit Url</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UrlDetailsDialog;
