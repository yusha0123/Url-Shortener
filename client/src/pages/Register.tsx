import Alert from "@/components/Alert";
import Logo from "@/components/Logo";
import { useSignup } from "@/hooks/useSignUp";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { isAxiosError } from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  IoMdEye,
  IoMdEyeOff,
  IoMdKey,
  IoMdMail,
  IoMdPerson,
} from "react-icons/io";
import { Link } from "react-router-dom";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const signUp = useSignup();

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    signUp.mutate(data);
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
            Create your account
          </p>
          {signUp.isError && (
            <Alert
              message={
                isAxiosError(signUp.error) &&
                signUp.error.response?.data?.message
                  ? signUp.error.response.data.message
                  : "Something went wrong!"
              }
            />
          )}
          <form
            className="flex flex-col gap-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="text"
              label="Username"
              radius="sm"
              labelPlacement="outside"
              startContent={
                <IoMdPerson className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Username must be less than 20 characters long",
                },
              })}
              isInvalid={!!errors?.username}
              errorMessage={errors?.username?.message as string | undefined}
            />
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
                  message: "please enter a valid email address",
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
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Please choose a stronger password",
                },
              })}
              isInvalid={!!errors?.password}
              errorMessage={errors?.password?.message as string | undefined}
            />
            <Button
              color="primary"
              radius="sm"
              className="mt-2"
              type="submit"
              isLoading={signUp.isPending}
            >
              Register
            </Button>
          </form>
        </CardBody>
        <CardFooter className="flex gap-2 justify-center text-sm px-2 text-gray-500 pt-2 pb-4">
          <p>Already have an account?</p>
          <Link
            className="underline hover:text-blue-500 transition duration-300 ease-in-out"
            to={"/login"}
          >
            Login now
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Register;
