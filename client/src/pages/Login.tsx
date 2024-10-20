import Logo from "@/components/Logo";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff, IoMdKey, IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <section className="bg-gradient-1 h-[100dvh] flex items-center justify-center">
      <Card className="md:w-[30%]">
        <CardHeader className="flex justify-center">
          <Logo />
        </CardHeader>
        <Divider />
        <CardBody className="w-full">
          <p className="text-2xl tracking-tight font-bold text-gray-900 text-center">
            Sign in to your account
          </p>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="email"
              label="Email"
              radius="sm"
              labelPlacement="outside"
              startContent={
                <IoMdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Email address is invalid",
                },
              })}
              isInvalid={!!errors?.email}
              errorMessage={errors?.email?.message as string | undefined}
            />
            <Input
              label="Password"
              radius="sm"
              labelPlacement="outside"
              startContent={
                <IoMdKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
              })}
              isInvalid={!!errors?.password}
              errorMessage={errors?.password?.message as string | undefined}
            />
            <Button color="primary" radius="sm" className="mt-2" type="submit">
              Login
            </Button>
          </form>
        </CardBody>
        <CardFooter className="flex gap-2 justify-center text-sm px-2 text-gray-500 pt-2 pb-4">
          <p>New to TinyLink?</p>
          <Link
            className="underline hover:text-blue-500 transition duration-300 ease-in-out"
            to={"/register"}
          >
            Create an account
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Login;
