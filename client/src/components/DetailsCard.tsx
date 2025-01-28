import { Button, CardBody, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdCheckmark, IoMdCopy } from "react-icons/io";
import { FaExternalLinkAlt, FaShareAlt, FaQrcode } from "react-icons/fa";
import useModalStore from "@/store/useModalStore";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

type Props = {
  urlData: UrlData;
  setIsSuccess: (success: boolean) => void;
};

const DetailsCard = ({ urlData, setIsSuccess }: Props) => {
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const { onOpen } = useModalStore();

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
    } catch (error: unknown) {
      toast.error("Failed to copy url!"); // will trigger in case of unsecured origin
    }
  };

  return (
    <CardBody className="px-3 py-5 flex flex-col gap-2">
      <Input
        type="text"
        label="Long URL"
        radius="sm"
        disabled
        value={urlData.longUrl}
        labelPlacement="outside"
        endContent={
          <button
            onClick={() => handleCopy(urlData.longUrl, 1)}
            className="focus:outline-none"
            type="button"
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
        disabled
        value={urlData.shortUrl}
        labelPlacement="outside"
        endContent={
          <button
            onClick={() => handleCopy(urlData.shortUrl, 2)}
            className="focus:outline-none"
            type="button"
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
      <div className="my-2 flex items-center justify-center gap-4">
        <Button
          isIconOnly
          aria-label="Visit Url"
          href={urlData.shortUrl}
          as={Link}
        >
          <FaExternalLinkAlt />
        </Button>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly aria-label="Share url">
              <FaShareAlt />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Social"></DropdownMenu>
        </Dropdown>
        <Button
          isIconOnly
          aria-label="Show QR Code"
          onClick={() =>
            onOpen("Qr-Code", {
              shortUrl: urlData?.shortUrl,
            })
          }
        >
          <FaQrcode />
        </Button>
      </div>
      <Button className="mt-2" onPress={() => setIsSuccess(false)}>
        Shorten Another
      </Button>
    </CardBody>
  );
};

export default DetailsCard;
