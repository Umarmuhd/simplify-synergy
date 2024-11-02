import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Item from "./transaction-item";
import { Transaction } from "@/types/transaction";

export default function TransactionList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <>
      <TableBody>
        {transactions.map((transaction) => (
          <React.Fragment key={transaction.id}>
            <Item {...transaction} />
          </React.Fragment>
        ))}
      </TableBody>
    </>
  );
}
