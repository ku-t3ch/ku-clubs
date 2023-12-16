import { api } from '@/utils/api';
import { Club } from '@prisma/client';
import { Button, Input, InputRef, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { NextPage } from 'next'
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Props { }

const All: NextPage<Props> = () => {
    const { data: session } = useSession();
    const getAllUsers = api.admin.getAllUsers.useQuery();
    const removeUserApi = api.admin.removeUser.useMutation();

    const onDeleteUser = async (email: string) => {
        if (!email) return;

        Modal.confirm({
            title: "Delete User",
            content: "Are you sure to delete this user?",
            onOk: () => {
                const key = toast.loading("Delete user...");
                removeUserApi.mutate({ email: email }, {
                    onSuccess: () => {
                        getAllUsers.refetch();
                        toast.success("Delete user success", {
                            id: key
                        });
                    },
                    onError: (err) => {
                        toast.error("Delete user failed", {
                            id: key
                        });
                    }
                })
            }

        })

    }

    const columns: ColumnsType<User> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (_, record) => {
                return (
                    <div className="flex gap-3">
                        <img className="max-w-[3rem] rounded-2xl" src={record.image!} alt="" />
                        <div className="flex flex-col justify-center">{record.name}</div>
                    </div>
                );
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (_, record) => {
                return <div className="flex gap-3">{record.email}</div>;
            },
        },
        {
            title: "Action",
            render: (_, record) => {
                return (
                    <div className="flex gap-3">
                        <Button danger disabled={session?.user.email === record.email} loading={removeUserApi.isLoading} onClick={() => onDeleteUser(record.email!)} type="primary">Delete</Button>
                    </div>
                );
            },
        },
        // {
        //     title: "Verified",
        //     dataIndex: "verified",
        //     render: (_, record) => {
        //         return <div className="flex gap-3">{record.approved ? "true" : "false"}</div>;
        //     },
        // },
        // {
        //     title: "Action",
        //     render: (_, record) => {
        //         return (
        //             <div className="flex gap-3">
        //                 <Button danger loading={removeClubs.isLoading} onClick={() => onDeleteClub(record.id)} type="primary">Delete</Button>
        //             </div>
        //         );
        //     },
        // },
    ];

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <div className='text-xl'>ผู้ใช้งานทั้งหมด</div>
                    {/* <Button onClick={onAddAdmin} type="primary">Add Addmin</Button> */}
                </div>
                <div className="flex items-center justify-between">
                    <Table loading={getAllUsers.isLoading} dataSource={getAllUsers.data} columns={columns} className="w-full" />
                </div>
            </div>
        </>
    );
}

export default All