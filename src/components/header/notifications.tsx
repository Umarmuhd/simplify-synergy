import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellIcon } from "lucide-react";

export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger>
        <BellIcon />
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="w-48"
      ></PopoverContent>
    </Popover>
  );
}
