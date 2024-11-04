export interface SearchParamOptions {
  [key: string]: unknown;
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export interface QueryOptions {
  language: string;
  limit?: number;
  page?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
}

export interface GetParams {
  id: string;
  language: string;
}
