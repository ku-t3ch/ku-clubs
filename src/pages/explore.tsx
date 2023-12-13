import ClubCard from "@/components/Explore/ClubCard";
import Stat from "@/components/common/Stat";
import { Input } from "@/components/form/Input";
import { api } from "@/utils/api";
import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, use, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface Props { }

const Explore: NextPage<Props> = () => {
    const [SearchKeyWord, setSearchKeyWord] = useState("");
    const clubAllApi = api.club.getAllClubs.useMutation();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { push } = useRouter()

    useEffect(() => {
        const timeout = setTimeout(async () => {
            clubAllApi.mutateAsync({ search: SearchKeyWord });
        }, 300);
        return () => clearTimeout(timeout);
    }, [SearchKeyWord]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyWord(e.target.value);
    };

    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-3 py-3">
            <Input type={"text"} placeholder="ค้นหาชมรม" onChange={handleSearch} />
            <div className="flex flex-wrap gap-3 overflow-y-auto">
                <AnimatePresence>
                    {clubAllApi.isLoading ? [...Array(4)].map((_, id) => (
                        <motion.div
                            // initial={{ opacity: 0 }}
                            // animate={{ opacity: 1 }}
                            // exit={{ opacity: 0 }}
                            key={id} role="status" className="border rounded-md w-full p-3 flex gap-2 animate-pulse">
                            <div className="h-[75px] w-[75px] bg-gray-200 rounded-2xl" />
                            <div className="flex flex-col justify-around w-full">
                                <div className="text-md md:text-xl bg-gray-200 h-6 w-full rounded-md" />
                                <div className="flex gap-2 w-full">
                                    <div className="bg-gray-200 h-6 w-[4.5rem] rounded-md" />
                                    <div className="bg-gray-200 h-6 w-[4.5rem] rounded-md" />
                                </div>
                            </div>
                        </motion.div>
                    )) : <>
                        {
                            clubAllApi.data?.length === 0 ? <div>ไม่พบข้อมูลที่จะแสดง</div> : clubAllApi.data?.map((club, id) => (
                                <motion.div
                                    onClick={() => push(`/club/${club.id}`)}
                                    className="border rounded-md w-full p-3 flex gap-2 hover:bg-slate-100 cursor-pointer" key={id}>
                                    <img className="h-[75px] w-[75px] rounded-2xl" src={club.logo} alt="" />
                                    <div className="flex flex-col justify-around">
                                        <div className="text-md md:text-xl">{club.name}</div>
                                        <Stat canlike={false} size={isMobile ? "sm" : "md"} location={club.campus.name} views={club.views} likes={club.likes} />
                                    </div>
                                </motion.div>
                            ))
                        }
                    </>}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default Explore;
