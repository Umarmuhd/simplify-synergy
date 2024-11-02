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
import { Transaction } from "@/types";

const transactions: Transaction[] = [
  {
    id: "TRN001",
    purpose: "WITHDRAWAL",
    amount: 5000,
    status: "PENDING",
    date: new Date().toISOString(),
    type: "inflow",
    description: "Withdrawal of funds",
  },
];

export default function TransactionList() {
  return (
    <>
      <Table className="bg-white">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] py-3">Invoice</TableHead>
            <TableHead className="py-3">Status</TableHead>
            <TableHead className="py-3">Method</TableHead>
            <TableHead className="text-right py-3">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <Item {...transaction} />
            </React.Fragment>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="py-3" colSpan={3}>
              Total
            </TableCell>
            <TableCell className="text-right py-3">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
