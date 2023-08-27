import { Campus, Club, ClubType } from "@prisma/client";
import { NextPage } from "next";
import { Button } from "../form/Button";
import { Form } from "antd";

interface Props {
  id: string | null;
  clubData:
    | Club & {
        campus: Campus;
        type: ClubType[];
        likes: {
          likeId: string | null;
        }[];
      };
}

const EditClubEditor: NextPage<Props> = () => {
  return (
    <div className="flex flex-col gap-x-5 md:flex-row">
      <Form className="relative flex w-full flex-col rounded-md ">sdf</Form>
      <div className="w-full flex-col gap-7 md:flex md:w-1/6">
        <Button
          //  loading={updateClub.isLoading}
          //   onClick={onSubmit}
          color="primary"
          size="large"
          className="w-full"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditClubEditor;
