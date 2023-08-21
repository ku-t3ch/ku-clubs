import { Button } from "@/components/form/Button";
import { Input } from "@/components/form/Input";
import { api } from "@/utils/api";
import { Icon } from "@iconify/react";
import { Club } from "@prisma/client";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface Props {}

const MyClubs: NextPage<Props> = () => {
  const getMyClubsApi = api.club.getMyClubs.useQuery();
  const [myClubs, setMyClubs] = useState<Club[]>([]);

  useEffect(() => {
    if (getMyClubsApi.data) {
      setMyClubs(getMyClubsApi.data);
    }
  }, [getMyClubsApi.data]);

  return (
    <>
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-3 py-3">
        <div className="flex w-full flex-col justify-between gap-5">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">ชมรมของฉัน</div>
            <Button
              type="button"
              color="secondary"
              className="flex items-center gap-1"
              href="/club/add"
            >
              <Icon icon="mdi:plus" className="text-xl" />
              เพิ่มชมรม
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <Input placeholder="ค้นหาชมรม" type={"text"} />
            <div className="flex flex-col">
              {myClubs.map((club, id) => (
                <div className="flex items-center justify-between border-b pb-2" key={id}>
                  <div className="flex gap-3 ">
                    <img className="max-w-[5rem] rounded-2xl" src={club.logo} alt="" />
                    <div className="flex flex-col justify-center">
                      <div className="font-bold">{club.name}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button href={`/club/edit/${club.id}`} type="button" color="secondary" className="flex items-center gap-1">
                      แก้ไข
                    </Button>
                    <Button href={`/club/${club.id}`} type="button" color="primary" className="flex items-center gap-1">
                      ดู
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyClubs;
