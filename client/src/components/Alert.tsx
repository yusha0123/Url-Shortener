import { GoAlertFill } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";

type Props = {
  message: string;
  type?: "error" | "warning" | "success" | "info";
  autoDismiss?: number; // in milliseconds
  onDismiss?: () => void;
};

const Alert = ({ message, type = "error", autoDismiss, onDismiss }: Props) => {
  const [visible, setVisible] = useState(true);

  // Handle auto-dismissal
  useEffect(() => {
    if (autoDismiss && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, autoDismiss);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, visible, onDismiss]);

  if (!visible) return null;

  // Color variants based on type
  const variants = {
    error: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-300",
      icon: "text-red-500",
    },
    warning: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-300",
      icon: "text-yellow-500",
    },
    success: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-300",
      icon: "text-green-500",
    },
    info: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-300",
      icon: "text-blue-500",
    },
  };

  const currentVariant = variants[type];

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div
      className={`flex items-center justify-between p-2.5 my-3 text-sm rounded-lg w-full ${currentVariant.bg} ${currentVariant.text} ${currentVariant.border}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center">
        <GoAlertFill
          className={`${currentVariant.icon} mr-2`}
          size={20}
          aria-hidden="true"
        />
        <div className="font-medium text-base">{message}</div>
      </div>
      <button
        className="ml-4 hover:opacity-70 rounded-full p-1 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
        onClick={handleDismiss}
        aria-label="Close alert"
      >
        <AiOutlineClose size={16} aria-hidden="true" />
      </button>
    </div>
  );
};

export default Alert;
