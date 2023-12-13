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
            path: "/news",
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
            path: "/admin/club/all",
            adminOnly: true,
        },
        {
            path: "/admin/user/all",
            adminOnly: true,
        },
        {
            path: "/404",
        }
    ];

export const NavbarContextProvider: NextPage<Props> = ({ children }) => {
    const { pathname } = useRouter();

    const reder: string = withNavbar.map((item) => {
        if (item.path === pathname) {
            if (item.adminOnly) {
                return "admin";
            } else if (item.editorOnly) {
                return "editor";
            } else {
                return "public";
            }
        }
    }).find((role) => role !== undefined) || "blank";

    return (
        <NavbarContext.Provider value={null}>
            {reder === "public" && <WithNavbar>{children}</WithNavbar>}
            {reder === "admin" && <WithNavbarAdmin>{children}</WithNavbarAdmin>}
            {reder === "editor" && <WithNavbarEditor>{children}</WithNavbarEditor>}
            {reder === "blank" && children}
        </NavbarContext.Provider>
    );
};
