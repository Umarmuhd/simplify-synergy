export interface SearchParamOptions {
  [key: string]: unknown;
}

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
