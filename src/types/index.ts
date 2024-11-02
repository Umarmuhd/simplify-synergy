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

export interface PaginatorInfo<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface GetParams {
  id: string;
  language: string;
}
