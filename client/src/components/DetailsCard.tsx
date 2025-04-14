import { socialPlatforms } from "@/constants";
import useModalStore from "@/store/useModalStore";
import {
  Button,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
} from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaExternalLinkAlt, FaQrcode, FaShareAlt } from "react-icons/fa";
import { IoMdCheckmark, IoMdCopy } from "react-icons/io";

type Props = {
  urlData: UrlData;
  setIsSuccess: (success: boolean) => void;
};

const DetailsCard = ({ urlData, setIsSuccess }: Props) => {
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const { onOpen } = useModalStore();

  const handleShare = (platform: (typeof socialPlatforms)[0]) => {
    const shareUrl = platform.shareUrl(urlData.shortUrl);
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async (url: string, index: 1 | 2) => {
    try {
      await navigator.clipboard.writeText(url);
      const setCopied = index === 1 ? setCopied1 : setCopied2;
      setCopied(true);

      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast.error("Failed to copy URL!");
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
            aria-label="Copy long URL"
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
            aria-label="Copy short URL"
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
          aria-label="Visit URL"
          href={urlData.shortUrl}
          as={Link}
          target="_blank"
        >
          <FaExternalLinkAlt />
        </Button>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly aria-label="Share URL">
              <FaShareAlt />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Social share options">
            {socialPlatforms.map((platform) => (
              <DropdownItem
                key={platform.key}
                startContent={platform.icon}
                onPress={() => handleShare(platform)}
              >
                {platform.key.charAt(0).toUpperCase() + platform.key.slice(1)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button
          isIconOnly
          aria-label="Show QR Code"
          onPress={() => onOpen("Qr-Code", { shortUrl: urlData.shortUrl })}
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
