import { QueryOptions } from ".";

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: string;
}

export interface TransactionQueryOptions extends QueryOptions {}

export interface AddTransactionPayload {
  amount: number;
  date: string;
  status: string;
}

export interface UpdateTransactionPayload {
  amount: number;
  status: string;
}
