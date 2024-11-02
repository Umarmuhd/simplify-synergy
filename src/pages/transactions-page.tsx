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

const transactions = [
  {
    id: 1,
    name: "Phillip Mango",
    email: "phillipmango@gmail.com",
    date: "Jun 6th 2020",
    amount: "1000 CAD",
    convertedAmount: "3900 BRL",
    status: "COMPLETED",
  },
  {
    id: 2,
    name: "Phillip Mango",
    email: "phillipmango@gmail.com",
    date: "Jun 1st 2020",
    amount: "1000 CAD",
    convertedAmount: "3900 BRL",
    status: "COMPLETED",
  },
  {
    id: 3,
    name: "Erin Culhane",
    email: "ericulhane@gmail.com",
    date: "May 17th 2020",
    amount: "1000 CAD",
    convertedAmount: "3900 BRL",
    status: "PENDING",
  },
  {
    id: 4,
    name: "Erin Culhane",
    email: "ericulhane@gmail.com",
    date: "May 17th 2020",
    amount: "1000 CAD",
    convertedAmount: "3900 BRL",
    status: "CANCELLED",
  },
];

export default function TransactionPages({ props }: any) {
  const { pathname } = useLocation();

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
            <TransactionList />
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
