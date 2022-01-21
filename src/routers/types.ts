import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/add-listing"?: {};
  "/settings"?: {};
  "/listing-detail/:id"?: {};
  "/edit-listing/:id"?: {};
  "/edit-photos/:id"?: {};
  "/loading"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
