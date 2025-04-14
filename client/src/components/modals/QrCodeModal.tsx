import useModalStore from "@/store/useModalStore";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import QRCode from "react-qr-code";
import { FaDownload, FaTimes } from "react-icons/fa";
import { useRef } from "react";

const QrCodeModal = () => {
  const { isOpen, type, data, onClose } = useModalStore();
  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = () => {
    const svg = qrCodeRef.current?.querySelector("svg");
    if (!svg) {
      // console.error("SVG not found!");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    img.src = url;
  };

  return (
    <Modal isOpen={isOpen && type === "Qr-Code"} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="mx-auto">Scan your QR Code</ModalHeader>
        <Divider />
        <ModalBody className="p-2 md:p-5">
          <div ref={qrCodeRef} className="w-full h-auto">
            <QRCode value={data?.shortUrl ?? ""} className="w-full h-auto" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="success" variant="flat" onPress={handleDownload}>
            <FaDownload />
            Download
          </Button>
          <Button color="danger" variant="flat" onPress={onClose}>
            <FaTimes />
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QrCodeModal;
