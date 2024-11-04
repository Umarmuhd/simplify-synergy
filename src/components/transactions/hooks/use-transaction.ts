import { create } from "zustand";

type TransactionState = {
  isOpen: boolean;
  data: any | null;
  onOpen: (data?: any) => void;
  onClose: () => void;
};

export const useTransaction = create<TransactionState>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: null }),
}));
