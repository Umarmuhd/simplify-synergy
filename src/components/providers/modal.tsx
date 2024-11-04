import { useMountedState } from "react-use";
import { TransactionFormModal } from "../transactions/transaction-form";

export default function ModalProvider() {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <TransactionFormModal />
    </>
  );
}
