import { List, Theme } from "@mui/material";
import { useRouter } from "next/router";
import { MenuItem } from "./MenuItem";
import { MENU_ITEMS } from "./menuItems";

const navBarStyle = (theme: Theme) =>
  ({
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    "& .MuiListItem-root": {
      padding: "0 3rem",
      [theme.breakpoints.down("xl")]: {
        padding: "0 0.75rem",
      },
    },
  } as const);

export const DesktopNavBar: React.FC = () => {
  const router = useRouter();

  return (
    <List sx={navBarStyle}>
      {Object.entries(MENU_ITEMS).map(([key, config]) => {
        return config.visible ? (
          <MenuItem router={router} config={config} key={key} />
        ) : null;
      })}
    </List>
  );
};
