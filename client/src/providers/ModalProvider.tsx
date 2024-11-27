import QrCodeModal from "@/components/modals/QrCodeModal";
import UrlManagerModal from "@/components/modals/UrlManagerModal";

const ModalProvider = () => {
  return (
    <>
      <UrlManagerModal />
      <QrCodeModal />
    </>
  );
};

export default ModalProvider;
