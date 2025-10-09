import React from "react";
import UserMenuPopover from "../user-menu-popover";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "../ui/sidebar";

const AdminHeader = () => {
  return (
    <div
      className={cn(
        "w-full px-5 h-12 fixed left-0 flex justify-between items-center"
      )}
    >
      <SidebarTrigger />
      <UserMenuPopover />
    </div>
  );
};

export default AdminHeader;
