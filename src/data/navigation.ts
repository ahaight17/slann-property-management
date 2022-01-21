import { MegamenuItem, NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";
import __megamenu from "./jsons/__megamenu.json";

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "none",
  },
  {
    id: ncNanoId(),
    href: "/add-listing",
    name: "Add Listing",
    type: "none",
  },
  {
    id: ncNanoId(),
    href: "/settings",
    name: "Settings",
    type: "none",
  }
];
