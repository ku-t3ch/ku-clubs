import { api } from "@/utils/api";
import { Icon } from "@iconify/react";
import { Campus, Club, User } from "@prisma/client";
import clsx from "clsx";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

interface Props {
  likes?: number;
  views?: number;
  location?: string;
  size?: "sm" | "md";
  clicked?: boolean;
  clubData?:
    | (Club & {
        campus: Campus;
        likes: {
          id: string;
        }[];
      })
    | null;
}

const Stat: NextPage<Props> = ({ likes, views, location, size, clubData, clicked }) => {
  const { status } = useSession();
  const likeApi = api.club.likeClub.useMutation();

  const apiGetLikeAmount = api.club.getLikeAmount.useQuery(clubData?.id || "");

  const canClickLike = status === "authenticated" ? true : false;

  const [clickedIn, setClicked] = useState(clicked);

  const onClickLike = () => {
    if (!clickedIn && clubData?.id) {
      likeApi.mutate(
        { id: clubData.id },
        {
          onSuccess: () => {
            apiGetLikeAmount.refetch();
            setClicked(true);
          },
        }
      );
    } else if (clickedIn && clubData?.id) {
      likeApi.mutate(
        { id: clubData.id },
        {
          onSuccess: () => {
            apiGetLikeAmount.refetch();
            setClicked(false);
          },
        }
      );
    }
  };

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
      {canClickLike ? (
        <>
          {clickedIn ? (
            <div
              className={clsx("flex items-center", "cursor-pointer text-blue-400")}
              onClick={onClickLike}
            >
              <Icon icon="material-symbols:thumb-up-outline" className={clsx(sizeIcon)} />
              <div className={clsx(font, "ml-1")}>{apiGetLikeAmount.data || likes} likes</div>
            </div>
          ) : (
            <div
              className={clsx("flex items-center", "cursor-pointer hover:text-blue-400")}
              onClick={onClickLike}
            >
              <Icon icon="material-symbols:thumb-up-outline" className={clsx(sizeIcon)} />
              <div className={clsx(font, "ml-1")}>{apiGetLikeAmount.data || likes} likes</div>
            </div>
          )}
        </>
      ) : (
        <div className={clsx("flex items-center")} onClick={onClickLike}>
          <Icon icon="material-symbols:thumb-up-outline" className={clsx(sizeIcon)} />
          <div className={clsx(font, "ml-1")}>{likes} likes</div>
        </div>
      )}

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
