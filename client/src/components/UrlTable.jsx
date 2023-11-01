import React, { useState, useRef } from "react";
import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
import { BsClipboardFill } from "react-icons/bs";
import { BiSolidEdit, BiSolidTrash, BiSolidChevronsDown } from "react-icons/bi";
import { motion } from "framer-motion";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAppContext } from "../hooks/useAppContext";
import { useErrorHandler } from "../hooks/useErrorHandler";
import LoadingToast from "./LoadingToast";

const UrlTable = ({ data, liftState }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [urlId, setUrlId] = useState(null);
  const cancelRef = useRef();
  const longUrl = useRef("");
  const newUrlRef = useRef("");
  const { user } = useAppContext();
  const modalSize = useBreakpointValue({ base: "xs", md: "md", xl: "xl" });
  const toast = useToast();
  const { errorHandler } = useErrorHandler();
  const queryClient = useQueryClient();

  const handleCopyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (error) {
      toast({
        title: "Unsecured Origin!",
        status: "error",
      });
    }
  };

  const deleteMutation = useMutation({
    mutationFn: () => {
      setOpenDialog(false);
      return axios.delete(`/api/tinylink/${urlId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      liftState();
      toast({
        title: "Url deleted!",
        status: "success",
      });
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (newData) => {
      setOpenModal(false);
      return axios.put(
        `/api/tinylink/${urlId}`,
        {
          newUrl: newData,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      toast({
        title: "Url updated!",
        status: "success",
      });
    },
    onError: (error) => {
      if (error.response.data.message == "Invalid URL!") {
        toast({
          title: "Invalid Url!",
          status: "error",
        });
        return;
      }
      errorHandler(error);
    },
  });

  const handleClick = (id, action) => {
    setUrlId(id);
    if (action === "delete") {
      setOpenDialog(true);
    } else {
      setOpenModal(true);
    }
  };

  const handleEdit = (item) => {
    const { redirectUrl, _id } = item;
    longUrl.current = redirectUrl;
    handleClick(_id, "edit");
  };

  return (
    <>
      {updateMutation.isLoading || deleteMutation.isLoading ? (
        <LoadingToast
          message={
            updateMutation.isLoading ? "Updating url..." : "Deleting url..."
          }
        />
      ) : null}
      <AlertDialog
        isOpen={openDialog}
        leastDestructiveRef={cancelRef}
        onClose={() => setOpenDialog(false)}
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
              <Button
                ref={cancelRef}
                onClick={() => setOpenDialog(false)}
                m={1}
              >
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
      {/* ALert Dialog Ends */}
      {/* Edit Modal */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
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
                <Input value={longUrl.current} isReadOnly />
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
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              colorScheme="telegram"
              onClick={() => updateMutation.mutate(newUrlRef.current.value)}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Edit Modal Ends*/}
      <TableContainer boxShadow={"md"}>
        <Table
          variant="simple"
          size={{
            base: "sm",
            lg: "md",
          }}
        >
          <Thead>
            <Tr>
              <Th textAlign={"center"}>#</Th>
              <Th textAlign={"center"}>Details</Th>
              <Th textAlign={"center"}>Clicks</Th>
              <Th textAlign={"center"}>Created At</Th>
              <Th textAlign={"center"}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Td>{index + 1}</Td>
                <Td>
                  <Flex gap={1} alignItems="center">
                    <Link href={item.shortUrl} isExternal>
                      {item.shortUrl}
                    </Link>
                    <Icon as={LuExternalLink} />
                  </Flex>
                </Td>
                <Td textAlign={"center"}>{item.clicks}</Td>
                <Td>{moment(item.createdAt).format("DD MMMM YYYY h:mm A")}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<Icon as={BiSolidChevronsDown} />}
                      size={{
                        base: "sm",
                        lg: "md",
                      }}
                    >
                      Menu
                    </MenuButton>
                    <MenuList>
                      <Link
                        href={item.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MenuItem
                          display={"flex"}
                          gap={2}
                          alignItems={"center"}
                        >
                          <Icon as={LuExternalLink} />
                          Open Link
                        </MenuItem>
                      </Link>
                      <MenuItem
                        display={"flex"}
                        gap={2}
                        alignItems={"center"}
                        onClick={() => handleCopyLink(item.shortUrl)}
                      >
                        <Icon as={BsClipboardFill} />
                        Copy Link
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleEdit(item)}
                        display={"flex"}
                        gap={2}
                        alignItems={"center"}
                      >
                        <Icon as={BiSolidEdit} />
                        Edit Link
                      </MenuItem>
                      <MenuItem
                        display={"flex"}
                        gap={2}
                        alignItems={"center"}
                        onClick={() => handleClick(item._id, "delete")}
                      >
                        <Icon as={BiSolidTrash} />
                        Delete Link
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </motion.tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UrlTable;
