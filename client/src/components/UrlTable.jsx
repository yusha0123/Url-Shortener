import {
  Button,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import moment from "moment";
import React from "react";
import { BiSolidChevronsDown, BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import { BsClipboardFill } from "react-icons/bs";
import { LuExternalLink } from "react-icons/lu";
import { modalTypes } from "../constants";
import useModalStore from "../hooks/useModalStore";

const UrlTable = ({ data }) => {
  const toast = useToast();
  const { onOpen } = useModalStore();

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

  return (
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
                  <Portal>
                    <MenuList zIndex={"popover"}>
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
                        onClick={() =>
                          onOpen(modalTypes.UPDATE, {
                            _id: item._id,
                            redirectUrl: item.redirectUrl,
                          })
                        }
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
                        onClick={() =>
                          onOpen(modalTypes.DELETE, {
                            _id: item._id,
                          })
                        }
                      >
                        <Icon as={BiSolidTrash} />
                        Delete Link
                      </MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              </Td>
            </motion.tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UrlTable;
