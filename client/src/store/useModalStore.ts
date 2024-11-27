import { create } from "zustand";

type ModalType = "Edit" | "Delete" | "Profile" | "Qr-Code";

interface ModalData {
  longUrl?: string;
  shortUrl?: string;
  _id?: string;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => {
    set({ isOpen: true, type, data });
  },
  onClose: () => set({ type: null, isOpen: false, data: {} }),
}));

export default useModalStore;
