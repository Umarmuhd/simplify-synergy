import React from "react";
import { Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
import TransactionList from "@/components/transactions/list";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTransactionsQuery } from "@/data/transactions";

export default function TransactionPages({ props }: any) {
  const { pathname } = useLocation();
  console.log("pathname", pathname);
  console.log("props", props);

  // const { transactions, error, loading } = useTransactionsQuery({});

  return (
    <div className="py-4">
      <h2 className="text-xl">Transactions</h2>
      <div className="flex justify-between items-center mt-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input className="pl-10" placeholder="Search" />
        </div>
        <Button>+ Add Transaction</Button>
      </div>

      <div className={cn("grid gap-6 grid-cols-8")}>
        <div
          className={
            pathname.split("/").length > 3 ? "col-span-5" : "col-span-8"
          }
        >
          {/* <Card>
            <div className="divide-y">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {transaction.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{transaction.name}</div>
                      <div className="text-sm text-gray-500">
                        {transaction.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-sm text-gray-500">
                        Last transaction date
                      </div>
                      <div>{transaction.date}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Last transaction amount
                      </div>
                      <div>
                        {transaction.amount} → {transaction.convertedAmount}
                      </div>
                    </div>
                    <Badge
                      variant={
                        transaction.status === "COMPLETED"
                          ? "default"
                          : transaction.status === "PENDING"
                          ? "secondary"
                          : "destructive"
                      }
                      className="ml-4"
                    >
                      {transaction.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card> */}
          <Card>
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
              <TransactionList transactions={[]} />
              <TableFooter>
                <TableRow>
                  <TableCell className="py-3" colSpan={3}>
                    Total
                  </TableCell>
                  <TableCell className="text-right py-3">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Card>
        </div>
        {pathname.split("/").length > 3 && (
          <div className="col-span-3 w-full bg-red-500">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}
