import { PaginatorInfo, QueryOptions } from ".";

type TransactionType = "inflow" | "outflow";

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: TransactionType;
  status: string;
  purpose: string;
}

export interface TransactionQueryOptions extends QueryOptions {}

export interface TransactionPaginator extends PaginatorInfo<Transaction> {}

export interface AddTransactionPayload {
  amount: number;
  date: string;
  description: string;
  type: TransactionType;
  status: string;
  purpose: string;
}
