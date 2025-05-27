import {
  BookOpenCheck,
  HandCoins,
  Home,
  User,
  LogOut,
  NotepadTextDashed,
  ClipboardMinus,
  Settings2,
} from "lucide-react";
import { ADMIN_ROUTES } from "./routes";

export const sidebarItems = [
  {
    title: "Dashboard",
    url: ADMIN_ROUTES.DASHBOARD,
    icon: Home,
  },
  {
    title: "Employee Management",
    url: ADMIN_ROUTES.EMPLOYEE_MANAGEMENT,
    icon: User,
  },
  {
    title: "Commissions Record",
    url: ADMIN_ROUTES.COMMISSIONS_RECORD,
    icon: HandCoins,
  },
  {
    title: "Claims Record",
    url: ADMIN_ROUTES.CLAIMS_RECORD,
    icon: BookOpenCheck,
  },
  {
    title: "Leave Record",
    url: ADMIN_ROUTES.LEAVE_RECORD,
    icon: LogOut,
  },
  {
    title: "Resignation/Termination",
    url: ADMIN_ROUTES.RESIGNATION_TERMINATION,
    icon: NotepadTextDashed,
  },
  {
    title: "Reports",
    url: ADMIN_ROUTES.REPORTS,
    icon: ClipboardMinus,
  },
  {
    title: "Settings",
    url: ADMIN_ROUTES.SETTINGS,
    icon: Settings2,
  },
];
