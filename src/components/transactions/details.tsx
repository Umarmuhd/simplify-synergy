import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid, Download, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TransactionDetailsProps {
  transactionDate?: string;
  transactionType?: string;
  paymentChannel?: string;
  accountName?: string;
  bankName?: string;
  accountNumber?: string;
  sessionId?: string;
  amount?: string;
}

export function TransactionDetails({
  transactionDate = "25 October 2024, 12:10:51",
  transactionType = "Withdraw",
  paymentChannel = "Bank Account",
  accountName = "UMAR MUHAMMAD ZAKARI",
  bankName = "Kuda",
  accountNumber = "110004762",
  sessionId = "090405241025122304083065920132",
  amount = "N240,000.00",
}: TransactionDetailsProps) {
  const navigate = useNavigate();
  return (
    <Card className="w-full max-w-2xl mx-auto relative">
      <button
        onClick={() => navigate(-1)}
        title="Close"
        className="absolute top-4 right-6"
      >
        <XIcon></XIcon>
      </button>
      <CardHeader className="space-y-6">
        <h2 className="text-2xl font-normal text-center">
          Transaction details
        </h2>
        <Select defaultValue="general">
          <SelectTrigger className="w-[140px] mx-auto">
            <Grid className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="text-muted-foreground">TRANSACTION DATE</div>
            <div className="text-right font-medium">{transactionDate}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="text-muted-foreground">TRANSACTION TYPE</div>
            <div className="text-right font-medium">{transactionType}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="text-muted-foreground">PAYMENT CHANNEL</div>
            <div className="text-right font-medium">{paymentChannel}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="text-muted-foreground">ACCOUNT NAME</div>
            <div className="text-right font-medium">{accountName}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="text-muted-foreground">BANK NAME</div>
            <div className="text-right font-medium">{bankName}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="text-muted-foreground">ACCOUNT NUMBER</div>
            <div className="text-right font-medium">{accountNumber}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="text-muted-foreground">SESSION ID</div>
            <div className="text-right font-medium break-all">{sessionId}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="text-muted-foreground">AMOUNT TENDERED</div>
            <div className="text-right font-medium">{amount}</div>
          </div>
        </div>

        <div className="space-y-4">
          <Button className="w-full" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download receipt
          </Button>
          <Button className="w-full" variant="outline" size="lg">
            Repeat transaction
          </Button>
        </div>

        <div className="text-center text-sm">
          Need help?{" "}
          <a href="#" className="text-primary hover:underline">
            Contact Support
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
