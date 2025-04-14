import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="text-3xl font-bold text-inherit">
      <Link to={"/"} className="flex items-center">
        <BiLink className="text-blue-700" />
        <span className="text-blue-700">TinyLink</span>
      </Link>
    </div>
  );
};

export default Logo;
