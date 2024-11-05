import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AmountInput } from "../amount-input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransaction } from "./hooks/use-transaction";
import {
  useCreateTransactionMutation,
  useEditTransactionMutation,
  useGetTransaction,
} from "@/data/transactions";
import { LoaderCircleIcon } from "lucide-react";

const formSchema = z.object({
  status: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  amount: z.string({
    required_error: "A valid amount is required.",
  }),
});

export function TransactionFormModal() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { isOpen, onClose, data } = useTransaction();

  console.log({ data });

  const transactionQuery = useGetTransaction(data?.id);

  const isLoading = transactionQuery.isLoading;

  const initialValues = {
    amount:
      data && transactionQuery.data
        ? String(transactionQuery.data?.amount)
        : "0",
    date:
      data && transactionQuery.data?.date
        ? new Date(transactionQuery.data.date)
        : new Date(),
    status:
      data && transactionQuery.data?.status ? transactionQuery.data.status : "",
  };

  console.log(initialValues);

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {data ? "Update Transaction" : "New Transaction"}
            </DialogTitle>
            <DialogDescription>
              {data
                ? "Update transaction details"
                : "Add new transaction details"}
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <div
              className="absolute inset-0 flex items-center 
          justify-center"
            >
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm initialValues={initialValues} />
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {data ? "Update Transaction" : "New Transaction"}
          </DrawerTitle>
          <DrawerDescription>
            {data
              ? "Add new transaction details"
              : "Update transaction details"}
          </DrawerDescription>
        </DrawerHeader>
        {isLoading ? (
          <div
            className="absolute inset-0 flex items-center 
          justify-center"
          >
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm initialValues={initialValues} className="px-4" />
        )}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

type FormProps = React.ComponentProps<"form"> & {
  initialValues?: { [x: string]: string | number | Date };
};

function TransactionForm({ className, initialValues }: FormProps) {
  const { onClose, data } = useTransaction();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  const mutation = useCreateTransactionMutation();

  const editMutation = useEditTransactionMutation(data?.id);

  const loading = mutation.isPending || editMutation.isPending;

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const payload = {
      ...values,
      amount: Number(values.amount),
      date: values.date.toISOString(),
    };
    if (data) {
      editMutation.mutate(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      mutation.mutate(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-8", className)}
        >
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <AmountInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            type="submit"
            className="flex w-full items-center gap-x-2"
          >
            {data ? "Save Changes" : "Create Transaction"}
            {loading && (
              <LoaderCircleIcon size={16} className="text-primary-foreground" />
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
