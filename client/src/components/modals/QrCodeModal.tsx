import useModalStore from "@/store/useModalStore";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import QRCode from "react-qr-code";

const QrCodeModal = () => {
  const { isOpen, type, data, onClose } = useModalStore();

  return (
    <Modal isOpen={isOpen && type === "Qr-Code"} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="mx-auto">Scan your QR Code</ModalHeader>
        <Divider />
        <ModalBody className="p-2 md:p-5">
          <QRCode value={data?.shortUrl ?? ""} className="w-full h-auto" />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QrCodeModal;
