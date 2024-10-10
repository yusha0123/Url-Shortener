import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import useModalStore from "../../hooks/useModalStore";
import { modalTypes } from "../../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import axios from "axios";
import { useAppContext } from "../../hooks/useAppContext";

const UpdateDialog = () => {
  const modalSize = useBreakpointValue({ base: "xs", md: "md", xl: "xl" });
  const { isOpen, type, onClose, data } = useModalStore();
  const newUrlRef = useRef(null);
  const { errorHandler } = useErrorHandler();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { user } = useAppContext();

  const updateMutation = useMutation({
    mutationFn: (newData) => {
      onClose();
      const promise = axios.put(
        `/api/tinylink/${data?._id}`,
        {
          newUrl: newData,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.promise(promise, {
        success: {
          title: "Url updated successfully!",
        },
        loading: {
          title: "Updating url...",
        },
        error: {
          title: "Failed to update url",
        },
      });

      return promise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  return (
    <Modal
      isOpen={isOpen && type === modalTypes.UPDATE}
      onClose={onClose}
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Edit Url</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Stack spacing={1}>
            <FormControl>
              <FormLabel>Long URL:</FormLabel>
              <Input value={data?.redirectUrl || ""} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>New Long URL:</FormLabel>
              <Input
                autoComplete="off"
                ref={newUrlRef}
                name="newUrl"
                defaultValue={""}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="green"
            onClick={() => updateMutation.mutate(newUrlRef?.current?.value)}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateDialog;
