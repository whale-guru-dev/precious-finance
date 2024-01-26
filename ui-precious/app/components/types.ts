export type Asset = {
  icon: string;
  label?: string;
};

type MenuItem = {
  label: string;
  path: string;
  status: "active" | "inactive";
  matches?: string[];
  visible: boolean;
};

export type MenuItemType = MenuItem & {
  subItems?: Array<MenuItem>;
};
