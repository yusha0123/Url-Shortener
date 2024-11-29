import useModalStore from "@/store/useModalStore";
import { Card, CardBody } from "@nextui-org/card";
import { Button, Link, Tooltip } from "@nextui-org/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  FaExternalLinkAlt,
  FaEdit,
  FaQrcode,
  FaShareAlt,
  FaCopy,
  FaTrashAlt,
} from "react-icons/fa";

type Props = {
  url: Url;
};

const UrlCard = ({
  url: { shortUrl, redirectUrl, clicks, createdAt },
}: Props) => {
  const formattedDate = format(new Date(createdAt), "dd MMMM yyyy h:mma");
  const domain = new URL(redirectUrl).hostname;
  const faviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  const displayShortUrl = shortUrl.replace(/(^\w+:|^)\/\//, "");
  const [isMobile, setIsMobile] = useState(false);
  const { onOpen } = useModalStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              isIconOnly={isMobile}
            >
              <FaEdit />
              <span className="hidden md:block">Edit</span>
            </Button>
            <Button
              variant="faded"
              aria-label="Generate QR Code"
              radius="sm"
              isIconOnly={isMobile}
              onClick={() =>
                onOpen("Qr-Code", {
                  shortUrl,
                })
              }
            >
              <FaQrcode />
              <span className="hidden md:block">QR Code</span>
            </Button>
            <Button
              variant="faded"
              aria-label="Share"
              radius="sm"
              isIconOnly={isMobile}
            >
              <FaShareAlt />
              <span className="hidden md:block">Share</span>
            </Button>
            <Button
              variant="faded"
              aria-label="Copy"
              radius="sm"
              isIconOnly={isMobile}
            >
              <FaCopy />
              <span className="hidden md:block">Copy</span>
            </Button>
            <Tooltip
              color="danger"
              content="Delete url"
              placement="bottom"
              showArrow={true}
            >
              <Button
                isIconOnly
                variant="faded"
                color="danger"
                aria-label="Delete"
                radius="sm"
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
