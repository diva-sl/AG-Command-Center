import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  Mail,
} from "lucide-react";

export const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    path: "/users",
    icon: Users,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: CreditCard,
  },
  {
    name: "Documents",
    path: "/documents",
    icon: FileText,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Newsletter",
    path: "/newsletter",
    icon: Mail,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];
