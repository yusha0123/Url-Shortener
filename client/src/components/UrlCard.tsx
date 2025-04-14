import { useDeleteUrl } from "@/hooks/useDeleteUrl";
import useModalStore from "@/store/useModalStore";
import { Card, CardBody } from "@heroui/react";
import { Button, Link, Tooltip } from "@heroui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaEdit,
  FaExternalLinkAlt,
  FaQrcode,
  FaShareAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { IoMdCheckmark, IoMdCopy } from "react-icons/io";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { socialPlatforms } from "@/constants";

type Props = {
  url: Url;
};

const UrlCard = ({
  url: { shortUrl, redirectUrl, clicks, createdAt, _id },
}: Props) => {
  const formattedDate = format(new Date(createdAt), "dd MMMM yyyy h:mma");
  const domain = new URL(redirectUrl).hostname;
  const faviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  const displayShortUrl = shortUrl.replace(/(^\w+:|^)\/\//, "");
  const [isMobile, setIsMobile] = useState(false);
  const { onOpen } = useModalStore();
  const deleteUrl = useDeleteUrl();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCopyClick = () => {
    try {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to copy url!");
    }
  };

  const handleShare = (platform: (typeof socialPlatforms)[0]) => {
    const shareUrl = platform.shareUrl(shortUrl);
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Card radius="sm" shadow="sm">
      <CardBody className="flex flex-row gap-4">
        <div className="md:flex items-center hidden">
          <img
            src={faviconUrl}
            alt="Favicon"
            className="size-8 rounded min-w-8"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-base font-semibold">{displayShortUrl}</h4>
          <p className="text-sm text-[#809a32] text-truncate">{redirectUrl}</p>
          <p className="text-sm">
            {clicks} clicks <span className="text-gray-600">|</span>{" "}
            {formattedDate}
          </p>

          <div className="flex gap-2 md:gap-4 flex-wrap">
            <Tooltip
              color="primary"
              content="Visit url"
              placement="bottom"
              showArrow={true}
            >
              <Button
                isIconOnly
                variant="faded"
                aria-label="Open link"
                radius="sm"
                as={Link}
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FaExternalLinkAlt />
              </Button>
            </Tooltip>
            <Button
              variant="faded"
              aria-label="Edit"
              radius="sm"
              isDisabled={deleteUrl.isPending}
              isIconOnly={isMobile}
              onPress={() => {
                onOpen("Edit", {
                  longUrl: redirectUrl,
                  shortUrl,
                  _id,
                });
              }}
            >
              <FaEdit />
              <span className="hidden md:block">Edit</span>
            </Button>
            <Button
              variant="faded"
              aria-label="Generate QR Code"
              radius="sm"
              isIconOnly={isMobile}
              onPress={() =>
                onOpen("Qr-Code", {
                  shortUrl,
                })
              }
            >
              <FaQrcode />
              <span className="hidden md:block">QR Code</span>
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  radius="sm"
                  variant="faded"
                  isIconOnly={isMobile}
                  aria-label="Share URL"
                >
                  <FaShareAlt />
                  <span className="hidden md:block">Share</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Social share options">
                {socialPlatforms.map((platform) => (
                  <DropdownItem
                    key={platform.key}
                    startContent={platform.icon}
                    onPress={() => handleShare(platform)}
                  >
                    {platform.key.charAt(0).toUpperCase() +
                      platform.key.slice(1)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              variant="faded"
              aria-label="Copy"
              radius="sm"
              isIconOnly={isMobile}
              onPress={handleCopyClick}
            >
              {copied ? (
                <>
                  <IoMdCheckmark />
                  <span className="hidden md:block">Copied</span>
                </>
              ) : (
                <>
                  <IoMdCopy />
                  <span className="hidden md:block">Copy</span>
                </>
              )}
            </Button>
            <Tooltip
              color="danger"
              content="Delete url"
              placement="bottom"
              showArrow={true}
            >
              <Button
                isDisabled={deleteUrl.isPending}
                isIconOnly
                variant="faded"
                color="danger"
                aria-label="Delete"
                radius="sm"
                onPress={() =>
                  onOpen("Delete", {
                    _id,
                  })
                }
              >
                <FaTrashAlt />
              </Button>
            </Tooltip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default UrlCard;
