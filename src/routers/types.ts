import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/add-listing"?: {};
  "/listing-detail/:address"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
