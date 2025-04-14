import { useDeleteUrl } from "@/hooks/useDeleteUrl";
import useModalStore from "@/store/useModalStore";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

const DeleteModal = () => {
  const { isOpen, type, data, onClose } = useModalStore();
  const deleteUrl = useDeleteUrl();

  const handleDelete = () => {
    onClose();
    deleteUrl.mutate(data?._id as string);
  };

  return (
    <Modal isOpen={isOpen && type === "Delete"} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="mx-auto">Are you absolutely sure?</ModalHeader>
        <ModalBody>
          <p className="text-gray-500 text-center">
            This action will permanently this url.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="danger" variant="flat" onPress={handleDelete}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
