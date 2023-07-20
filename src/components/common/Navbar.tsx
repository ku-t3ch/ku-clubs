import { NavItem } from "@/interfaces/NavItem";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Band from "./Band";

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
    label: "เพิ่มชมรม",
    to: "/add-club",
  },
  {
    label: "ชมรมของฉัน",
    to: "/my-clubs",
  },
];

const Navbar: NextPage<Props> = () => {
  const { asPath } = useRouter();
  const [NavbarToggle, setNavbarToggle] = useState<boolean>(false);

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
    <div className="mx-auto flex max-w-6xl select-none flex-col px-3 py-5">
      {/* Desktop Screen Session */}
      <div className="hidden flex-col gap-10 md:flex">
        <div className="flex justify-between">
          <Band />
          <div className="flex items-center gap-10">
            <div className="flex space-x-8">
              {navbarItems.map((item, id) => (
                <Link href={item.to} key={id} className={clsx("font-bold", isNavbarItemActive(item.to) ? "text-black" : "text-gray-400")}>
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="/sign-in" className="btn-primary px-5">
              <Icon icon="mdi:login" className="text-2xl text-white" />
            </Link>
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
              <Link href={item.to} key={id} className={clsx("font-bold", isNavbarItemActive(item.to) ? "text-black" : "text-gray-400")}>
                {item.label}
              </Link>
            ))}
            <Link href="/sign-in" className={clsx("font-bold", "text-red-500")}>
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
