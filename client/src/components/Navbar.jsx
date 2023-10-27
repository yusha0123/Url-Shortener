import {
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useAppContext } from "../hooks/useAppContext";
import { MdLogout } from "react-icons/md";
import { useLogout } from "../hooks/useLogout";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const { logout } = useLogout();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      as="nav"
      boxShadow={user ? "md" : "sm"}
      zIndex={99}
      bg={user && "gray.200"}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={{
          base: "5",
          lg: "7",
        }}
        py={{
          base: "3",
          lg: "4",
        }}
      >
        <Box>
          <Link to={"/"}>
            <Logo />
          </Link>
        </Box>
        {user ? (
          <Button
            colorScheme="red"
            onClick={logout}
            rightIcon={<Icon as={MdLogout} />}
            size={{
              base: "sm",
              md: "md",
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            {isSmallScreen ? (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<Icon as={GiHamburgerMenu} />}
                  variant="outline"
                  size={"sm"}
                />
                <MenuList>
                  <MenuItem onClick={() => navigate("/login")}>
                    Sign in
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/register")}>
                    Sign up
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing="3">
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Sign in
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </Button>
              </HStack>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
