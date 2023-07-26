import { Icon } from "@iconify/react";
import { NextPage } from "next";

interface Props {
  likes?: number;
  views?: number;
  location?: string;
}

const Stat: NextPage<Props> = ({ likes, views, location }) => {
  return (
    <div className="flex flex-wrap gap-x-3  gap-y-3 text-sm text-gray-400 md:gap-x-6 md:text-base">
      {likes && (
        <div className="flex items-center">
          <Icon icon="material-symbols:thumb-up-outline" className="text-2xl" />
          <div className="ml-1">{likes} likes</div>
        </div>
      )}
      {views && (
        <div className="flex items-center">
          <Icon icon="ph:eye" className="text-2xl" />
          <div className="ml-1">{views} views</div>
        </div>
      )}
      {location && (
        <div className="flex items-center">
          <Icon icon="carbon:location" className="text-2xl" />
          <div className="ml-1">{location}</div>
        </div>
      )}
    </div>
  );
};

export default Stat;
