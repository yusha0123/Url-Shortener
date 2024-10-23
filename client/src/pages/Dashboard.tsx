import { useCreateUrl } from "@/hooks/useCreateUrl";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, Divider, Input } from "@nextui-org/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaLink } from "react-icons/fa6";

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      redirectUrl: "",
    },
  });
  const createUrl = useCreateUrl();
  const { errorHandler } = useErrorHandler();

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    createUrl.mutate(data, {
      onSuccess: () => reset(),
      onError: (error) => errorHandler(error),
    });
  };

  return (
    <section className="h-full w-full">
      <Card
        className="max-w-2xl mt-5 mx-auto w-[95%] sm:w-[75%] md:w-[50%] lg:w-[35%]"
        shadow="sm"
      >
        <CardHeader className="flex justify-center">
          <h2 className="font-bold text-xl lg:text-2xl">
            Shorten your Link &#128640;
          </h2>
        </CardHeader>
        <Divider />
        <CardBody className="px-3 py-5">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="text"
              size="lg"
              variant={"faded"}
              radius="sm"
              {...register("redirectUrl", {
                required: "Long URL is required",
                pattern: {
                  value:
                    /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w.,@?^=%&:/~+#-]*)?$/,
                  message: "Please enter a valid URL",
                },
              })}
              isInvalid={!!errors?.redirectUrl}
              errorMessage={errors?.redirectUrl?.message as string | undefined}
              placeholder="Paste your long URL here"
              startContent={
                <div className="focus:outline-none">
                  <FaLink className="text-2xl text-default-400 pointer-events-none" />
                </div>
              }
            />
            <Button
              color="primary"
              radius="sm"
              type="submit"
              className="max-w-sm mx-auto w-full"
              isLoading={createUrl.isPending}
            >
              Shorten
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
};

export default Dashboard;
