import React from "react";
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { Transaction } from "@/types";

export default function Item({ ...item }: Transaction) {
  const navigate = useNavigate();
  return (
    <>
      <TableRow
        onClick={() => navigate("/dashboard/transactions/" + item.id)}
        key={item.id}
      >
        <TableCell className="font-medium py-3">{item.id}</TableCell>
        <TableCell className="py-3">{item.purpose}</TableCell>
        <TableCell className="py-3">{item.status}</TableCell>
        <TableCell className="text-right py-3">{item.amount}</TableCell>
      </TableRow>
    </>
  );
}
