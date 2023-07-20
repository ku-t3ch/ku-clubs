import WithNavbar from "@/layouts/WithNavbar";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { type ReactNode, createContext } from "react";

const NavbarContext = createContext(null);

interface Props {
  children: ReactNode;
}

const withNavbar: string[] = ["/", "/explore", "/add-club", "/my-clubs", "/sign-in"];

export const NavbarContextProvider: NextPage<Props> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <NavbarContext.Provider value={null}>
      {withNavbar.includes(pathname) ? <WithNavbar>{children}</WithNavbar> : children}
    </NavbarContext.Provider>
  );
};
