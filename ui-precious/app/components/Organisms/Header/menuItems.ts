import { MenuItemType } from "@/components/types";

export const MENU_ITEMS: MenuItemType[] = [
  {
    label: "Overview",
    path: "/",
    status: "active",
    visible: false,
  },
  {
    label: "Magic",
    path: "/magic",
    status: "active",
    matches: ["/magic"],
    visible: true,
  },
  {
    label: "govMagic",
    path: "/govmagic",
    status: "active",
    matches: ["/govmagic"],
    visible: true,
  },
  {
    label: "Claim",
    path: "/claim",
    status: "active",
    matches: ["/claim"],
    visible: true,
  },
  {
    label: "Add liquidity",
    path: "/liquidity",
    status: "active",
    matches: ["/liquidity"],
    visible: true,
  },
];
