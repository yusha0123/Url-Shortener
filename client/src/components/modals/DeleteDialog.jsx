import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import useModalStore from "../../hooks/useModalStore";
import { modalTypes } from "../../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import axios from "axios";

const DeleteDialog = () => {
  const cancelRef = useRef();
  const { onClose, isOpen, type, data } = useModalStore();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { errorHandler } = useErrorHandler();

  const deleteMutation = useMutation({
    mutationFn: () => {
      onClose();
      const promise = axios.delete(`/api/tinylink/${data?._id}`);

      toast.promise(promise, {
        success: {
          title: "Url deleted successfully!",
        },
        loading: {
          title: "Deleting url...",
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
    <AlertDialog
      isOpen={isOpen && type === modalTypes.DELETE}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete URL
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure, you want to delete this URL?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} m={1}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => deleteMutation.mutate()}
              m={1}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteDialog;
