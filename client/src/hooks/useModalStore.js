import { create } from "zustand";

const useModalStore = create((set) => ({
    type: null,
    isOpen: false,
    data: undefined,
    onOpen: (type, data) => {
        set({ isOpen: true, type, data });
    },
    onClose: () => set({ type: null, isOpen: false, data: undefined }),
}));

export default useModalStore;
