type DecodedToken = {
  email: string;
  username: string;
};

type UrlData = {
  longUrl: string;
  shortUrl: string;
};

type Url = {
  _id: string;
  redirectUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
};
