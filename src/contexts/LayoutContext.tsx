import WithNavbar from "@/layouts/WithNavbar";
import WithNavbarAdmin from "@/layouts/WithNavbarAdmin";
import WithNavbarEditor from "@/layouts/WithNavbarEditor";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { type ReactNode, createContext, useState } from "react";

export type LayoutContextDataType = {
    withNavbarContext?: {
        title?: string;
        menu?: MenuItemType[];
    };
    withNavbarAdminContext?: {
        title?: string;
        menu?: MenuItemType[];
    };
    withNavbarEditorContext?: {
        title?: string;
        menu?: MenuItemType[];
    };
}

export type LayoutContextType = {
    DataContext: LayoutContextDataType | undefined,
    setDataContext: React.Dispatch<React.SetStateAction<LayoutContextDataType | undefined>>
};

export const LayoutContext = createContext<LayoutContextType>({
    DataContext: undefined,
    setDataContext: () => { }
});

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
            path: "/my-clubs",
        },
        {
            path: "/my-clubs/[id]",
            editorOnly: true,
        },
        {
            path: "/my-clubs/[id]/detail",
            editorOnly: true,
        },
        {
            path: "/my-clubs/[id]/permission",
            editorOnly: true,
        },
        {
            path: "/my-clubs/[id]/management-team",
            editorOnly: true,
        },
        {
            path: "/my-clubs/[id]/publish",
            editorOnly: true,
        },
        {
            path: "/my-clubs/[id]/setting",
            editorOnly: true,
        },
        {
            path: "/my-account",
        },
        {
            path: "/club/[id]",
        },
        {
            path: "/club/add",
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

export const LayoutContextProvider: NextPage<Props> = ({ children }) => {
    const { pathname } = useRouter();
    const [DataContext, setDataContext] = useState<LayoutContextDataType>()

    const render: string = withNavbar.map((item) => {
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
        <LayoutContext.Provider value={{ DataContext, setDataContext }}>
            {render === "public" && <WithNavbar>{children}</WithNavbar>}
            {render === "admin" && <WithNavbarAdmin>{children}</WithNavbarAdmin>}
            {render === "editor" && <WithNavbarEditor>{children}</WithNavbarEditor>}
            {render === "blank" && children}
        </LayoutContext.Provider>
    );
};
