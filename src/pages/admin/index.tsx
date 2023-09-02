import { api } from "@/utils/api";
import { Club, User } from "@prisma/client";
import { Badge, Button, Switch, Table, TableColumnType } from "antd";
import { ColumnsType } from "antd/es/table";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

interface Props {
  canAccess: boolean;
}

const Index: NextPage<Props> = () => {
  const getAllClub = api.admin.getAllClubs.useQuery();
  const approveClub = api.admin.approveClub.useMutation();

  const setApproved = (id: string, e: boolean) => {
    console.log(id, e);

    approveClub.mutate(
      { id, approved: e },
      {
        onSuccess: () => {
          getAllClub.refetch();
        },
      }
    );
  };

  const columns: ColumnsType<
    Club & {
      owner: User;
      likes: User[];
    }
  > = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="flex gap-3">
            <img className="max-w-[5rem] rounded-2xl" src={record.logo} alt="" />
            <Link href={`/admin/club/${record.id}`} className="flex flex-col justify-center">{record.name}</Link>
          </div>
        );
      },
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (_, record) => {
        return <div className="flex gap-3">{record.owner.email}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "approved",
      render: (_, record) => {
        return (
          <div className="flex gap-3">
            {record.approved ? (
              <Badge count="ผ่าน" color="#00c00a" />
            ) : (
              <Badge count="รอการตรวจสอบ" color="#faad14" />
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <div className="flex gap-3">
            <Switch
              defaultChecked={record.approved}
              onChange={(e) => setApproved(record.id, e)}
              loading={approveClub.isLoading}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-3 py-3">
        <div className="flex items-center justify-between">
          <Table dataSource={getAllClub.data} columns={columns} className="w-full" />
        </div>
      </div>
    </>
  );
};

export default Index;
