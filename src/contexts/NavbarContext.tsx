import WithNavbar from "@/layouts/WithNavbar";
import WithNavbarAdmin from "@/layouts/WithNavbarAdmin";
import WithNavbarEditor from "@/layouts/WithNavbarEditor";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { type ReactNode, createContext } from "react";

export const NavbarContext = createContext(null);

interface Props {
    children: ReactNode;
}

const withNavbar: {
    path: string;
    adminOnly?: boolean;
    editorOnly?: boolean;
}[] = [
        {
            path: "/",
        },
        {
            path: "/explore",
        },
        {
            path: "/add-club",
            editorOnly: true,
        },
        {
            path: "/my-clubs",
            editorOnly: true,
        },
        {
            path: "/my-account",
        },
        {
            path: "/club/[id]",
        },
        {
            path: "/club/edit/[id]",
            editorOnly: true,
        },
        {
            path: "/club/add",
            editorOnly: true,
        },
        {
            path: "/admin",
            adminOnly: true,
        },
        {
            path: "/admin/club/[id]",
            adminOnly: true,
        },
        {
            path: "/admin/management",
            adminOnly: true,
        },
        {
            path: "/404",
        }
    ];

export const NavbarContextProvider: NextPage<Props> = ({ children }) => {
    const { pathname } = useRouter();

    const reder = withNavbar.find((path) => path.path === pathname)?.adminOnly ? "admin" : withNavbar.find((path) => path.path === pathname)?.editorOnly ? "editor" : "user";

    return (
        <NavbarContext.Provider value={null}>
            {reder === "admin" ? <WithNavbarAdmin>{children}</WithNavbarAdmin> : reder === "editor" ? <WithNavbarEditor>{children}</WithNavbarEditor> : <WithNavbar>{children}</WithNavbar>}
        </NavbarContext.Provider>
    );
};
