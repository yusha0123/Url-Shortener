import { Card, CardBody } from "@nextui-org/card";
import { format } from "date-fns";

type Props = {
  url: Url;
};

const UrlCard = ({
  url: { shortUrl, redirectUrl, clicks, createdAt },
}: Props) => {
  const formattedDate = format(new Date(createdAt), "do MMMM yyyy h:mma");
  const domain = new URL(redirectUrl).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  const displayShortUrl = shortUrl.replace(/(^\w+:|^)\/\//, "");

  return (
    <Card radius="sm" shadow="sm">
      <CardBody className="flex flex-row gap-4">
        <div className="flex items-center">
          <img src={faviconUrl} alt="Favicon" className="size-8 rounded" />
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-base font-semibold">{displayShortUrl}</h4>
          <p className="text-sm text-[#809a32]">{redirectUrl}</p>
          <p className="text-sm">
            {clicks} clicks <span className="text-gray-600">|</span>{" "}
            {formattedDate}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default UrlCard;
