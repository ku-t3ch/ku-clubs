import { api } from "@/utils/api";
import { Club, User } from "@prisma/client";
import { Badge, Button, Input, InputRef, Modal, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MouseEventHandler, useRef } from "react";
import toast from "react-hot-toast";

interface Props {
    canAccess: boolean;
}

const Management: NextPage<Props> = () => {
    const getAllAdmins = api.admin.getAllAdmins.useQuery();
    const dropAdminApi = api.admin.removeAdmin.useMutation();
    const addAdminApi = api.admin.addAdmin.useMutation();
    const emailAddRef = useRef<InputRef>(null);
    const { data: session } = useSession();

    const onDropAdmin = (email: string | null) => {
        Modal.confirm({
            title: 'Drop Admin',
            content: "Are you sure you want to drop this admin?",
            okText: "Yes",
            cancelText: "No",
            onOk: (data) => {
                if (!email) return
                let key = toast.loading('Dropping Admin...')
                dropAdminApi.mutate({ email: email }, {
                    onSuccess: () => {
                        getAllAdmins.refetch()
                        toast.success('Dropped Admin', { id: key })
                    },
                    onError: (error) => {
                        toast.error(error.message, { id: key })
                    }
                })
            }
        })

    }

    const onAddAdmin = () => {
        Modal.confirm({
            title: 'Add Admin',
            content: <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <label htmlFor="email">Email</label>
                    <Input ref={emailAddRef} />
                </div>
            </div>,
            onOk: (data) => {
                if (!emailAddRef.current?.input?.value) return

                const email = emailAddRef.current?.input?.value
                const isCorrectEmail = email.match(/^[a-zA-Z0-9._-]+@ku\.th$/)

                if (!isCorrectEmail) {
                    toast.error('Invalid Email @ku.th only')
                    return
                }

                let key = toast.loading('Adding Admin...')
                addAdminApi.mutate({ email: email! }, {
                    onSuccess: () => {
                        getAllAdmins.refetch()
                        toast.success('Added Admin', { id: key })
                    },
                    onError: (error) => {
                        toast.error("Failed to add admin", { id: key })
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
                        <Button danger onClick={() => onDropAdmin(record.email)} type="primary">Drop Admin</Button>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <div>Admin Management</div>
                    <Button onClick={onAddAdmin} type="primary">Add Addmin</Button>
                </div>
                <div className="flex items-center justify-between">
                    <Table loading={getAllAdmins.isLoading} dataSource={getAllAdmins.data} columns={columns} className="w-full" />
                </div>
            </div>
        </>
    );
};

export default Management;
