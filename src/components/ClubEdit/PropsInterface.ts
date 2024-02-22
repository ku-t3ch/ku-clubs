import { Campus, Club, ClubType } from "@prisma/client";

export interface PropsInterface {
  id: string | null;
  clubData:
    | (Club & {
        campus: Campus;
        type: ClubType[];
        likes: {
          likeId: string | null;
        }[];
        owner?: {
          id: string;
          email: string | null;
        };
        editor?: {
          email: string | null;
        }[];
        president: {
          email: string | null;
        } | null;
        vice_president: {
          email: string | null;
        } | null;
        secretary: {
          email: string | null;
        } | null;
        treasurer: {
          email: string | null;
        } | null;
      })
    | null;
}
