import Logo from "@/components/Logo";
import {
  Button,
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

const Navbar = () => {
  return (
    <NextUiNavbar isBordered className="md:py-1">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-8">
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
      </NavbarContent>
    </NextUiNavbar>
  );
};

export default Navbar;
