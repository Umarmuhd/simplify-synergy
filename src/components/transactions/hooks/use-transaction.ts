import { create } from "zustand";

type TransactionState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useTransaction = create<TransactionState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
