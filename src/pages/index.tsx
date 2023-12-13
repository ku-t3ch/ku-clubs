
import Band from "@/components/common/Band";
import { NavbarContext } from "@/contexts/NavbarContext";
import { Icon } from "@iconify/react";
import { ChevronRightIcon } from "lucide-react";
import { type NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";

const Home: NextPage = () => {
    const test = useContext(NavbarContext);
    const title = "คุณกำลังมองหา ชมรมอยู่ใช่ไหม";
    const description = "เว็บเราคือแหล่งรวบรวมชมรมต่าง ๆ ในมหาวิทยาลัยเกษตรศาสตร์ ทุกวิทยาเขต เพื่อน ๆ ทุกคนสามารถค้นหาชมรมที่โดนใจได้";

    console.log(test);


    return (
        <div>
            <div className="z-10 mx-auto max-w-6xl py-3 md:py-20">
                <div className="flex flex-col gap-6 md:gap-10">
                    <div className="md:hidden">
                        <Band />
                    </div>
                    <div className="max-w-xs text-[2.25rem] font-bold leading-[3rem] md:max-w-sm md:text-[3rem] md:leading-[4rem]">{title}</div>
                    <div className="max-w-[50rem] text-[1rem] font-bold text-gray-500 md:text-[1.5rem]">{description}</div>
                    <Link href="/explore" className="btn-primary mt-5 w-fit gap-5 px-10 text-[1.5rem] md:mt-0">
                        สำรวจชมรม
                        <ChevronRightIcon className="text-4xl text-white" />
                    </Link>
                </div>
            </div>
            <div style={{ zIndex: -1 }} className="absolute bottom-0 right-0 overflow-hidden">
                <svg width="1991" height="1304" viewBox="0 0 1991 1304" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-x-[50rem] md:translate-x-[35rem] translate-y-[45rem] md:translate-y-[34rem]">
                    <g filter="url(#filter0_f_15_1563)">
                        <path
                            d="M635.726 639.335C380.033 591.754 303.37 747.628 297 831.512C350.707 850.485 529.087 908.511 812.957 988.835C1096.83 1069.16 1484.29 863.702 1642.54 750.932C1716.1 667.794 1767.08 471.524 1382.5 351.549C997.907 231.574 1007.17 337.16 1059.88 404.949C1087.48 439.697 1131.07 527.29 1084.61 599.685C1026.53 690.177 955.342 698.811 635.726 639.335Z"
                            fill="#60A5FA"
                        />
                        <path
                            d="M635.726 639.335C380.033 591.754 303.37 747.628 297 831.512C350.707 850.485 529.087 908.511 812.957 988.835C1096.83 1069.16 1484.29 863.702 1642.54 750.932C1716.1 667.794 1767.08 471.524 1382.5 351.549C997.907 231.574 1007.17 337.16 1059.88 404.949C1087.48 439.697 1131.07 527.29 1084.61 599.685C1026.53 690.177 955.342 698.811 635.726 639.335Z"
                            stroke="black"
                        />
                    </g>
                    <defs>
                        <filter id="filter0_f_15_1563" x="0.472412" y="0.5" width="1990.03" height="1303" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity={0} result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="148" result="effect1_foregroundBlu_15_1563" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default Home;
