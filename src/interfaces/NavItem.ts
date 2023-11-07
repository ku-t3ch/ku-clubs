import { type ReactNode } from "react";

export interface NavItem {
  to: string;
  label: string;
  onlyNotRegistered?: boolean;
  dropdownItems?: DropdownItem[];
  newTab?: boolean;
  onlyAdmin?: boolean;
  protected?: boolean;
}

export interface DropdownItem {
  to: string;
  label: string;
  icon?: ReactNode;
  description?: string;
  newTab?: boolean;
}
