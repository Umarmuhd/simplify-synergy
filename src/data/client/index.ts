import { Transaction, TransactionQueryOptions } from "@/types/transaction";
import { HttpClient } from "./http-client";
import { API_ENDPOINTS } from "./api-endpoints";
import { AddTransactionPayload } from "@/types/transaction";

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
  };
}

export default new Client();
