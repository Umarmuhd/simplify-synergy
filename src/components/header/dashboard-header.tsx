import { UserMenu } from "./user-menu";
import { Notifications } from "./notifications";
import { SidebarTrigger } from "../ui/sidebar";
import HeaderLogo from "../header-logo";

export function Header() {
  return (
    <header>
      <div className="flex justify-between md:justify-end items-center">
        <div className="md:hidden flex items-center">
          <SidebarTrigger />
          <HeaderLogo />
        </div>
        <div className="flex items-center space-x-3">
          <Notifications />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
