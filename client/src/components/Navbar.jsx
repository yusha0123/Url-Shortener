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

export const Navbar = () => {
  const navigate = useNavigate();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Box as="nav" boxShadow="sm" zIndex={10}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={{
          base: "3",
          lg: "6",
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

        {isSmallScreen && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<Icon as={GiHamburgerMenu} />}
              variant="outline"
              size={"sm"}
            />
            <MenuList>
              <MenuItem onClick={() => navigate("/login")}>Sign in</MenuItem>
              <MenuItem onClick={() => navigate("/register")}>Sign up</MenuItem>
            </MenuList>
          </Menu>
        )}

        {!isSmallScreen && (
          <HStack spacing="3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign in
            </Button>
            <Button colorScheme="blue" onClick={() => navigate("/register")}>
              Sign up
            </Button>
          </HStack>
        )}
      </Box>
    </Box>
  );
};
