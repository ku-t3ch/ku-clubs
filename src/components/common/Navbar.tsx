import { NavItem } from "@/interfaces/NavItem";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Band from "./Band";
import { signOut, useSession } from "next-auth/react";
import tw from "tailwind-styled-components";

const Menu = tw.div<{ $active?: boolean; isNotPointer?: boolean }>`
    font-bold
    ${(p) => (p.isNotPointer ? "" : "cursor-pointer")}
    ${(p) => (p.$active ? "text-black" : "text-gray-400")}
`;

const MenuWithLink = tw(Link)<{ $active?: boolean; isNotPointer?: boolean }>`
    font-bold
    ${(p) => (p.isNotPointer ? "" : "cursor-pointer")}
    ${(p) => (p.$active ? "text-black" : "text-gray-400")}
`;

interface Props {}

const navbarItems: NavItem[] = [
  {
    label: "หน้าแรก",
    to: "/",
  },
  {
    label: "สำรวจชมรม",
    to: "/explore",
  },
  {
    label: "ชมรมของฉัน",
    to: "/my-clubs",
  },
];

const Navbar: NextPage<Props> = () => {
  const { asPath } = useRouter();
  const [NavbarToggle, setNavbarToggle] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const isNavbarItemActive = (to: string) => {
    return asPath === to;
  };

  const onNavbarToggle = () => {
    setNavbarToggle(!NavbarToggle);
  };

  useEffect(() => {
    setNavbarToggle(false);
  }, [asPath]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-3 py-5">
      {/* Desktop Screen Session */}
      <div className="hidden flex-col gap-10 md:flex">
        <div className="flex justify-between">
          <Band />
          <div className="flex items-center gap-10">
            <div className="flex space-x-8">
              {navbarItems.map((item, id) => (
                <MenuWithLink href={item.to} key={id} $active={isNavbarItemActive(item.to)}>
                  {item.label}
                </MenuWithLink>
              ))}
            </div>
            {status === "authenticated" ? (
              <div className="dropdown">
                <div className="btn-secondary px-3">
                  <Icon icon="mdi:account" className="text-xl" />
                </div>
                <div className="dropdown-content absolute right-0 z-50 pt-2">
                  <div className="flex min-w-[10rem] flex-col gap-4 rounded-2xl bg-white p-4 shadow-md">
                    {session.user.image && (
                      <img
                        src={session.user.image}
                        alt="profile-image"
                        className="w-10 rounded-md"
                      />
                    )}
                    <Menu isNotPointer>{session.user.email}</Menu>
                    <MenuWithLink href="/my-account" $active={isNavbarItemActive("/my-account")}>
                      บัชชีของฉัน
                    </MenuWithLink>
                    <Menu onClick={() => signOut()} className="text-red-500">
                      ออกจากระบบ
                    </Menu>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/sign-in?callbackUrl=/" className="btn-primary px-5">
                <Icon icon="mdi:login" className="text-2xl text-white" />
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Screen Session */}
      <div className="flex flex-col gap-10 md:hidden">
        <div className="w-fit cursor-pointer" onClick={onNavbarToggle}>
          <Icon icon={NavbarToggle ? "maki:cross-11" : "pajamas:hamburger"} className="text-2xl" />
        </div>
      </div>
      {NavbarToggle && (
        <div className="absolute bottom-0 left-0 right-0 top-[4rem] z-20 flex justify-center bg-white md:hidden">
          <div className="flex flex-col items-center gap-10">
            <Band />
            {navbarItems.map((item, id) => (
              <MenuWithLink
                href={item.to}
                key={id}
                className={"font-bold"}
                $active={isNavbarItemActive(item.to)}
              >
                {item.label}
              </MenuWithLink>
            ))}
            {status === "authenticated" ? (
              <>
                <MenuWithLink href="/my-account" $active={isNavbarItemActive("/my-account")}>
                  บัชชีของฉัน
                </MenuWithLink>
                <Menu>{session.user.email}</Menu>
                <Menu onClick={() => signOut()} className={clsx("text-red-500")}>
                  ออกจากระบบ
                </Menu>
              </>
            ) : (
              <Link href="/sign-in?callbackUrl=/" className={clsx("font-bold")}>
                เข้าสู่ระบบ
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
