import {
  Transaction,
  TransactionQueryOptions,
  AddTransactionPayload,
  UpdateTransactionPayload,
} from "@/types/transaction";
import { HttpClient } from "./http-client";
import { API_ENDPOINTS } from "./api-endpoints";
import { GetParams } from "@/types/index";

class Client {
  transactions = {
    paginated: ({
      //   type,
      //   name,
      //   categories,
      //   shop_id,
      //   product_type,
      //   status,
      ...params
    }: Partial<TransactionQueryOptions>) => {
      return HttpClient.get<Transaction[]>(API_ENDPOINTS.TRANSACTIONS, {
        // searchJoin: "and",
        // with: "shop;type;categories",
        // shop_id,
        ...params,
        // search: HttpClient.formatSearchParams({
        //   type,
        //   name,
        //   categories,
        //   shop_id,
        //   product_type,
        //   status,
        // }),
      });
    },
    create(data: AddTransactionPayload) {
      return HttpClient.post<Transaction>(API_ENDPOINTS.TRANSACTIONS, data);
    },
    update({
      id,
      ...input
    }: Partial<UpdateTransactionPayload> & { id: string }) {
      return HttpClient.put<Transaction>(
        `${API_ENDPOINTS.TRANSACTIONS}/${id}`,
        input
      );
    },
    delete({ id }: { id: string }) {
      return HttpClient.delete<boolean>(`${API_ENDPOINTS.TRANSACTIONS}/${id}`);
    },
    async bulk_delete({ ids }: { ids: string[] }) {
      for await (const id of ids) {
        HttpClient.delete<boolean>(`${API_ENDPOINTS.TRANSACTIONS}/${id}`);
      }
    },
    get({ id }: GetParams) {
      return HttpClient.get<Transaction>(`${API_ENDPOINTS.TRANSACTIONS}/${id}`);
    },
  };
}

export default new Client();
