import DeleteModal from "@/components/modals/DeleteModal";
import QrCodeModal from "@/components/modals/QrCodeModal";
import UrlManagerModal from "@/components/modals/UrlManagerModal";

const ModalProvider = () => {
  return (
    <>
      <UrlManagerModal />
      <QrCodeModal />
      <DeleteModal />
    </>
  );
};

export default ModalProvider;
