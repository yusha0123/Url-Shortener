import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaReddit,
} from "react-icons/fa";

const urls = {
  root: {
    route: "/",
    title: "Tiny Link - Home",
  },
  login: {
    route: "/login",
    title: "Tiny Link - Login",
  },
  register: {
    route: "/register",
    title: "Tiny Link - Register",
  },
  dashboard: {
    route: "/dashboard",
    title: "Tiny Link - Dashboard",
  },
  notFound: {
    route: "*",
    title: "Tiny Link - 404 Not Found",
  },
};

const socialPlatforms = [
  {
    key: "facebook",
    icon: <FaFacebook className="text-blue-600" />,
    shareUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    key: "twitter",
    icon: <FaTwitter className="text-blue-400" />,
    shareUrl: (url: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    key: "whatsapp",
    icon: <FaWhatsapp className="text-green-500" />,
    shareUrl: (url: string) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
  },
  {
    key: "linkedin",
    icon: <FaLinkedin className="text-blue-700" />,
    shareUrl: (url: string) =>
      `https://www.linkedin.com/shareArticle/?url=${encodeURIComponent(url)}`,
  },
  {
    key: "reddit",
    icon: <FaReddit className="text-orange-500" />,
    shareUrl: (url: string) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}`,
  },
];

export { urls, socialPlatforms };
