// import { GetParams } from "@/types";
import {
  AddTransactionPayload,
  Transaction,
  TransactionQueryOptions,
} from "@/types/transaction";
import { useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { useQuery, useMutation } from "@tanstack/react-query";
import client from "./client";

import { toast } from "sonner";

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Transaction, Error, AddTransactionPayload>({
    mutationFn: async (json) => {
      return await client.transactions.create(json);
    },
    onSuccess: () => {
      toast.success("Transaction created");
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.TRANSACTIONS] });
    },
    onError: () => {
      toast.error("Failed to create transaction");
    },
  });

  return mutation;
};

// export const useProductQuery = ({ slug, language }: GetParams) => {
//   const { data, error, isLoading } = useQuery<Product, Error>(
//     [API_ENDPOINTS.PRODUCTS, { slug, language }],
//     () => productClient.get({ slug, language })
//   );

//   return {
//     product: data,
//     error,
//     isLoading,
//   };
// };

export const useTransactionsQuery = (
  params: Partial<TransactionQueryOptions>,
  options = {}
) => {
  const { data, error, isLoading } = useQuery<Transaction[], Error>({
    queryKey: [API_ENDPOINTS.TRANSACTIONS, params],
    queryFn: ({ queryKey, pageParam }) =>
      client.transactions.paginated(Object.assign({}, queryKey[1], pageParam)),
    ...options,
  });

  return {
    transactions: data ?? [],
    // paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};
