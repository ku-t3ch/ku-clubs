import ClubCard from "@/components/Explore/ClubCard";
import { Input } from "@/components/form/Input";
import { api } from "@/utils/api";
import { NextPage } from "next";
import { ChangeEvent, use, useEffect, useState } from "react";

interface Props { }

const Explore: NextPage<Props> = () => {
    const [SearchKeyWord, setSearchKeyWord] = useState("");
    const clubAllApi = api.club.getAllClubs.useQuery({ search: SearchKeyWord });

    useEffect(() => {
        const timeout = setTimeout(() => {
            clubAllApi.refetch();
        }, 500);
        return () => clearTimeout(timeout);
    }, [SearchKeyWord]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyWord(e.target.value);
    };

    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3">
            <Input type={"text"} placeholder="ค้นหาชมรม" onChange={handleSearch} />
            <div className="flex flex-wrap justify-center gap-5">
                {clubAllApi.data?.map((club, id) => (
                    <ClubCard key={id} data={{ ...club, canlike: false }} />
                ))}
            </div>
        </div>
    );
};

export default Explore;
