import ClubCard from "@/components/Explore/ClubCard";
import { api } from "@/utils/api";
import { NextPage } from "next";

interface Props {}

const Explore: NextPage<Props> = () => {
  const clubAllApi = api.club.getAllClubs.useQuery();

  return (
    <div className="mx-auto max-w-6xl px-3 py-3">
      <div className="flex flex-wrap justify-center gap-5">
        {clubAllApi.data?.map((club, id) => (
          <ClubCard key={id} data={club} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
