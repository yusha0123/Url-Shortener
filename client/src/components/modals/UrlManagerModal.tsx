import useModalStore from "@/store/useModalStore";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdCopy, IoMdCheckmark } from "react-icons/io";

const UrlManagerModal = () => {
  const { isOpen, type, onClose, data } = useModalStore();
  const { register } = useForm<FieldValues>({
    defaultValues: {
      longUrl: data?.longUrl,
      shortUrl: data?.shortUrl,
    },
  });
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);

  const isModalOpen = isOpen && type === "Edit";
  const isEditMode = isOpen && type === "Edit";

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

  return (
    <Modal isOpen={isModalOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="mx-auto">
          {isEditMode ? "Edit your URL" : "Your shortened URL"}
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            label="Long URL"
            radius="sm"
            disabled={!isEditMode}
            value={!isEditMode ? data?.longUrl : undefined}
            {...register("longUrl")}
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
          <Input
            type="text"
            label="Short URL"
            radius="sm"
            disabled={!isEditMode}
            value={!isEditMode ? data?.shortUrl : undefined}
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
        </ModalBody>
        {!isEditMode && (
          <ModalFooter>
            <Button color="success" onPress={onClose}>
              Look&apos;s Good
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UrlManagerModal;
