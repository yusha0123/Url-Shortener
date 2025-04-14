import Logo from "@/components/Logo";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Button,
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <NextUiNavbar isBordered className="md:py-1">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-8">
        {user ? (
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={user?.username}
                  size="sm"
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.username}`}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                {/* <DropdownItem key="settings">My Profile</DropdownItem> */}
                <DropdownItem key="logout" color="danger" onPress={logout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="login" color="secondary">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="secondary"
                href="register"
                as={Link}
                variant="solid"
                radius="sm"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </NextUiNavbar>
  );
};

export default Navbar;
