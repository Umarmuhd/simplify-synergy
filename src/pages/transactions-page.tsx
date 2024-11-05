// import React from "react";
// import { Outlet } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// import { useLocation } from "react-router-dom";
// import { cn } from "@/lib/utils";
import {
  useBulkDeleteTransactions,
  useTransactionsQuery,
} from "@/data/transactions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  // Loader2,
  Plus,
} from "lucide-react";

import { columns } from "../components/transactions/columns";
import { DataTable } from "../components/data-table";
// import { Skeleton } from "@/components/ui/skeleton";

// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import Header from "@/components/header";
import { useTransaction } from "@/components/transactions/hooks/use-transaction";

type Transactions = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const transactions: Transactions[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];

// export const columns: ColumnDef<Transactions>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("status")}</div>
//     ),
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Email
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
//   },
//   {
//     accessorKey: "amount",
//     header: () => <div className="text-right">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"));

//       // Format the amount as a dollar amount
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount);

//       return <div className="text-right font-medium">{formatted}</div>;
//     },
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

export default function TransactionPages() {
  const { transactions, error, loading } = useTransactionsQuery({});

  console.log({ transactions, error, loading });

  const deleteTransactions = useBulkDeleteTransactions();

  const isDisabled = deleteTransactions.isPending;

  const { onOpen } = useTransaction();

  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        <div className="max-x-screen-2xl mx-auto w-full pb-10 -mt-24">
          <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
              <CardTitle className="text-xl line-clamp-1">
                Transactions page
              </CardTitle>
              <Button onClick={() => onOpen(null)} size="sm">
                <Plus className="size-4 mr-2" />
                Add new
              </Button>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={transactions}
                filterKey="id"
                onDelete={(row) => {
                  const ids = row.map((r) => r.original.id);
                  deleteTransactions.mutate({ ids });
                }}
                disabled={isDisabled}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
