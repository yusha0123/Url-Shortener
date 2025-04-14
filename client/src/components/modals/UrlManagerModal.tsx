import { useUpdateUrl } from "@/hooks/useUpdateUrl";
import useModalStore from "@/store/useModalStore";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdCheckmark, IoMdCopy } from "react-icons/io";

const UrlManagerModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      longUrl: data?.longUrl,
      newUrl: data?.shortUrl,
    },
  });
  const watchedNewUrl = watch("newUrl");
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const updateUrl = useUpdateUrl();

  const isModalOpen = isOpen && type === "Edit";

  const handleCopy = async (url: string | undefined, index: number) => {
    try {
      await navigator.clipboard.writeText(url!);
      if (index === 1) {
        setCopied1(true);
      } else {
        setCopied2(true);
      }

      setTimeout(() => {
        if (index === 1) {
          setCopied1(false);
        } else {
          setCopied2(false);
        }
      }, 2000);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to copy url!"); //will trigger in case of unsecured origin
    }
  };

  const onSubmit = async (values: FieldValues) => {
    onClose();
    reset();
    updateUrl.mutate({ ...values, _id: data._id });
  };

  return (
    <Modal isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="mx-auto">Edit your URL</ModalHeader>
        <ModalBody>
          <form
            className="flex flex-col gap-4 pb-2 md:pb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="text"
              label="Short URL"
              radius="sm"
              value={data?.shortUrl}
              disabled
              {...register("shortUrl")}
              labelPlacement="outside"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => handleCopy(data?.shortUrl, 2)}
                  aria-label="toggle password visibility"
                >
                  {copied2 ? (
                    <IoMdCheckmark className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoMdCopy className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <Input
              type="text"
              label="Long URL"
              radius="sm"
              defaultValue={data?.longUrl}
              {...register("newUrl", {
                required: "Long URL is required",
                pattern: {
                  value:
                    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                  message: "Please enter a valid URL",
                },
              })}
              isInvalid={!!errors?.newUrl}
              errorMessage={errors?.newUrl?.message as string | undefined}
              labelPlacement="outside"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => handleCopy(data?.longUrl, 1)}
                  aria-label="toggle password visibility"
                >
                  {copied1 ? (
                    <IoMdCheckmark className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoMdCopy className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />

            <Button
              className="mx-auto mt-2"
              type="submit"
              color="secondary"
              isDisabled={watchedNewUrl === data?.longUrl}
            >
              Update url
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UrlManagerModal;
