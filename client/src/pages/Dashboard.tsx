import { useCreateUrl } from "@/hooks/useCreateUrl";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, Divider, Input } from "@nextui-org/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaLink } from "react-icons/fa6";
import { IoLink } from "react-icons/io5";
import { FaInfoCircle, FaMagic } from "react-icons/fa";
import { useState } from "react";
import DetailsCard from "@/components/DetailsCard";

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [urlData, setUrlData] = useState<UrlData | null>(null);

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    createUrl.mutate(data, {
      onSuccess: ({ data }) => {
        reset();
        setUrlData(data);
        setIsSuccess(true);
      },
    });
  };

  return (
    <section className="h-full w-full">
      <Card
        className="max-w-2xl mt-5 mx-auto w-[95%] sm:w-[75%] md:w-[50%] lg:w-[35%]"
        shadow="sm"
      >
        <CardHeader className="flex justify-center">
          <h2 className="font-bold text-xl lg:text-2xl flex items-center gap-2">
            {!isSuccess ? (
              <>
                <IoLink />
                Shorten a long Url
              </>
            ) : (
              <>
                <FaInfoCircle />
                Your URL Details
              </>
            )}
          </h2>
        </CardHeader>
        <Divider />
        {isSuccess ? (
          <DetailsCard urlData={urlData!} />
        ) : (
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
                      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                    message: "Please enter a valid URL",
                  },
                })}
                isInvalid={!!errors?.redirectUrl}
                errorMessage={
                  errors?.redirectUrl?.message as string | undefined
                }
                placeholder="Enter your long URL here"
                startContent={
                  <div className="focus:outline-none">
                    <FaLink className="text-2xl text-default-400 pointer-events-none" />
                  </div>
                }
              />
              <Input
                type="text"
                size="lg"
                variant={"faded"}
                radius="sm"
                {...register("customAlias", {
                  validate: (value) =>
                    !value ||
                    value.length >= 5 ||
                    "Custom alias must be at least 5 characters",
                })}
                isInvalid={!!errors?.customAlias}
                errorMessage={
                  errors?.customAlias?.message as string | undefined
                }
                placeholder="Custom alias (optional)"
                startContent={
                  <div className="focus:outline-none">
                    <FaMagic className="text-2xl text-default-400 pointer-events-none" />
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
        )}
      </Card>
    </section>
  );
};

export default Dashboard;
