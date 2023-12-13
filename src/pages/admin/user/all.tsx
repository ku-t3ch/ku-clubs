import { api } from '@/utils/api';
import { Club } from '@prisma/client';
import { Button, Input, InputRef, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { NextPage } from 'next'
import { User } from 'next-auth';
import toast from 'react-hot-toast';

interface Props { }

const All: NextPage<Props> = () => {
    const getAllUsers = api.admin.getAllUsers.useQuery();
    const removeClubs = api.admin.removeClub.useMutation();

    const onDeleteClub = async (id: string) => {
        if (!id) return;
        
        Modal.confirm({
            title: "Delete club",
            content: "Are you sure to delete this club?",
            onOk: () => {
                const key = toast.loading("Delete club...");
                removeClubs.mutate({ id: id }, {
                    onSuccess: () => {
                        getAllUsers.refetch();
                        toast.success("Delete club success", {
                            id: key
                        });
                    },
                    onError: (err) => {
                        toast.error("Delete club failed", {
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