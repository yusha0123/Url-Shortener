import Logo from "@/components/Logo";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { IoMdMail, IoMdKey } from "react-icons/io";

const Login = () => {
  return (
    <section className="bg-gradient-1 h-[100dvh] flex items-center justify-center">
      <Card className="md:w-[30%]">
        <CardHeader className="flex justify-center">
          <Logo />
        </CardHeader>
        <Divider />
        <CardBody className="w-full flex flex-col gap-y-4">
          <p className="font-bold text-2xl text-gray-700 text-center">
            Login to your account
          </p>
          <Input
            type="email"
            label="Email"
            radius="sm"
            labelPlacement="outside"
            startContent={
              <IoMdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Input
            type="password"
            label="Password"
            radius="sm"
            labelPlacement="outside"
            startContent={
              <IoMdKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Button color="primary" radius="sm" className="mt-2">
            Login
          </Button>
        </CardBody>
      </Card>
    </section>
  );
};

export default Login;
