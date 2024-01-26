import { ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { NextRouter } from "next/router";
import { MenuItemType } from "@/components/types";

interface MenuItemProps {
  router: NextRouter;
  config: MenuItemType;
}

export const MenuItem: React.FC<MenuItemProps> = ({ router, config }) => {
  return (
    <ListItem
      selected={config?.matches?.includes(router.pathname)}
      button
      disabled={config.status === "inactive"}
    >
      <Link href={config.path}>
        <ListItemText primary={config.label} />
      </Link>
    </ListItem>
  );
};
