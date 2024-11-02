import { GetParams } from "@/types";
import {
  TransactionPaginator,
  TransactionQueryOptions,
} from "@/types/transaction";
import { useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "./client/api-endpoints";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import client from "./client";

// export const useCreateTransactionMutation = () => {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const { t } = useTranslation();
//   return useMutation(productClient.create, {
//     onSuccess: async () => {
//       const generateRedirectUrl = router.query.shop
//         ? `/${router.query.shop}${Routes.product.list}`
//         : Routes.product.list;
//       await Router.push(generateRedirectUrl, undefined, {
//         locale: Config.defaultLanguage,
//       });
//       toast.success(t("common:successfully-created"));
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS);
//     },
//     onError: (error: any) => {
//       const { data, status } = error?.response;
//       if (status === 422) {
//         const errorMessage: any = Object.values(data).flat();
//         toast.error(errorMessage[0]);
//       } else {
//         toast.error(t(`common:${error?.response?.data.message}`));
//       }
//     },
//   });
// };

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
  const { data, error, isLoading } = useQuery<TransactionPaginator, Error>({
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
