import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/add-listing"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
