// import { GetParams } from "@/types";
import {
  AddTransactionPayload,
  Transaction,
  TransactionQueryOptions,
  UpdateTransactionPayload,
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

export const useEditTransactionMutation = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Transaction, Error, UpdateTransactionPayload>({
    mutationFn: async (json) => {
      return await client.transactions.update({ id: id as string, ...json });
    },
    onSuccess: () => {
      toast.success("Transaction updated");
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.TRANSACTIONS, { id }],
      });
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.TRANSACTIONS] });
      //TODO: Invalidate summary
    },
    onError: () => {
      toast.error("Failed to edit transaction");
    },
  });

  return mutation;
};

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: [API_ENDPOINTS.TRANSACTIONS, { id }],
    queryFn: async () => {
      return await client.transactions.get({
        id: id as string,
        language: "en",
      });
    },
  });

  return query;
};

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

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, Error>({
    mutationFn: async (_json) => {
      return await client.transactions.delete({
        id: id as string,
      });
    },
    onSuccess: () => {
      toast.success("Transaction deleted");
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.TRANSACTIONS, { id }],
      });
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.TRANSACTIONS] });
      //TODO: Invalidate summary
    },
    onError: () => {
      toast.error("Failed to delete transaction");
    },
  });

  return mutation;
};
