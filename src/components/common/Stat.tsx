import { Icon } from "@iconify/react";
import clsx from "clsx";
import { NextPage } from "next";

interface Props {
  likes?: number;
  views?: number;
  location?: string;
  size?: "sm" | "md";
}

const Stat: NextPage<Props> = ({ likes = 0, views, location, size }) => {
  let font = [""];
  let sizeIcon = [""];
  let gap = [""];

  switch (size) {
    case "sm":
      font.push("text-[10px]");
      sizeIcon.push("text-[15px]");
      gap.push("gap-x-1 gap-y-0.5 md:gap-x-3");
      break;
    case "md":
      font.push("text-base");
      sizeIcon.push("text-2xl");
      gap.push("gap-x-3 gap-y-3 md:gap-x-6");
      break;
    default:
      font.push("text-base");
      sizeIcon.push("text-2xl");
      gap.push("gap-x-3 gap-y-3 md:gap-x-6");
      break;
  }

  return (
    <div className={clsx("flex flex-wrap text-sm text-gray-400 md:text-base", gap)}>
      <div className="flex items-center">
        <Icon icon="material-symbols:thumb-up-outline" className={clsx(sizeIcon)} />
        <div className={clsx(font, "ml-1")}>{likes || 0} likes</div>
      </div>
      <div className="flex items-center">
        <Icon icon="ph:eye" className={clsx(sizeIcon)} />
        <div className={clsx(font, "ml-1")}>{views || 0} views</div>
      </div>
      {location && (
        <div className="flex place-items-center">
          <Icon icon="carbon:location" className={clsx(sizeIcon)} />
          <div className={clsx(font, "ml-1")}>{location}</div>
        </div>
      )}
    </div>
  );
};

export default Stat;
