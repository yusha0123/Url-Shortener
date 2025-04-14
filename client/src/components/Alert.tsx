import { GoAlertFill } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

type Props = {
  message: string;
};

const Alert = ({ message }: Props) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="flex items-center justify-between p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-100 w-full"
      role="alert"
    >
      <div className="flex items-center">
        <GoAlertFill className="text-red-500 mr-2" size={20} />
        <div className="font-medium text-lg">{message}</div>
      </div>
      <button
        className="ml-4 text-red-500 hover:bg-red-200 rounded-full p-1 transition"
        onClick={() => setVisible(false)}
        aria-label="Close"
      >
        <AiOutlineClose size={20} />
      </button>
    </div>
  );
};

export default Alert;
