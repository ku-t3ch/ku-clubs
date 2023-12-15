import React, { createContext, useContext, useEffect, useState } from 'react';
import { Layout, Menu, Button, theme, ConfigProvider, Spin } from 'antd';
import { NextPage } from 'next';
import { CalendarDaysIcon, ChevronLeftIcon, GaugeIcon, GlobeIcon, LockIcon, PenIcon, PlusIcon, SettingsIcon, UsersRoundIcon } from 'lucide-react';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { LayoutContext } from '@/contexts/LayoutContext';
import checkHasAccessByPathname from '@/utils/checkHasAccessByPathname';
import { useSession } from 'next-auth/react';
import { api } from '@/utils/api';
import useEditorStore from '@/store/useEditorStore';
const { Sider, Content } = Layout;

const HeaderComponent = dynamic(() => import('@/components/common/Editor/HeaderComponentEditor'), { ssr: false })

interface Props {
    children: React.ReactNode;
    title?: string
}

const WithNavbarEditor: NextPage<Props> = ({ children }) => {
    const { push, back, query, pathname, asPath } = useRouter()
    const clubDetailApi = api.club.getClub.useMutation()
    const { data: session, status } = useSession()
    const [collapsed, setCollapsed] = useState(false);
    const { setHeader } = useEditorStore(state => state)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if (query.id) {
            clubDetailApi.mutate(query.id as string, {
                onSuccess: (data) => {
                    setHeader(data)
                }
            })
        }
    }, [query.id])

    if (status === "loading") return <div className='flex min-h-screen justify-center items-center'>
        <div className='flex flex-col items-center gap-2'>
            <Spin tip="Loading" size="large" />
            <div className='text-lg'>กำลังโหลด...</div>
        </div>
    </div>



    const checkResult = checkHasAccessByPathname(session?.user.owner!, asPath)
    const ItemsOwnerOnly: ItemType<MenuItemType>[] = checkResult ? [
        {
            key: `/my-clubs/[id]/setting`,
            icon: <SettingsIcon size={20} />,
            label: 'ตั้งค่า',
            onClick: () => push(`/my-clubs/${query.id}/setting`),
        },
    ] : []

    const Items: ItemType<MenuItemType>[] = [

        {
            key: `/my-clubs/[id]`,
            icon: <GaugeIcon size={20} />,
            label: 'Dashboard',
            onClick: () => push(`/my-clubs/${query.id}`),
        },
        {
            key: `/my-clubs/[id]/events`,
            icon: <CalendarDaysIcon size={20} />,
            label: 'จัดการอีเว้นท์',
            children: [
                {
                    key: `/my-clubs/[id]/events`,
                    icon: <CalendarDaysIcon size={20} />,
                    label: 'อีเว้นท์ทั้งหมด',
                    onClick: () => push(`/my-clubs/${query.id}/events`),
                },
                {
                    key: `/my-clubs/[id]/events/create`,
                    icon: <PlusIcon size={20} />,
                    label: 'เพิ่มอีเว้นท์',
                    onClick: () => push(`/my-clubs/${query.id}/events/create`),
                }
            ]
        },
        {
            key: `/my-clubs/[id]/detail`,
            icon: <PenIcon size={20} />,
            label: 'แก้ไขชมรม',
            onClick: () => push(`/my-clubs/${query.id}/detail`),
        },
        {
            key: `/my-clubs/[id]/permission`,
            icon: <LockIcon size={20} />,
            label: 'สิทธิ์การแก้ไข',
            onClick: () => push(`/my-clubs/${query.id}/permission`),
        },
        {
            key: `/my-clubs/[id]/publish`,
            icon: <GlobeIcon size={20} />,
            label: 'เผยแพร่',
            onClick: () => push(`/my-clubs/${query.id}/publish`),
        },
        ...ItemsOwnerOnly,
    ]

    const toExpore = () => {
        push('/my-clubs')
    }


    return (
        <Layout className='min-h-screen'>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                }}
            >
                <Sider
                    trigger={
                        <div className='flex justify-center items-center h-full'>
                            <Button onClick={toExpore} ghost type='text' className='text-white flex gap-2 items-center'>
                                {collapsed ? <>
                                    <ChevronLeftIcon />
                                </> : <div className='flex gap-1'>
                                    <ChevronLeftIcon />
                                    ย้อนกลับ
                                </div>}
                            </Button>
                        </div>
                    }
                    collapsible collapsed={collapsed}>
                    <div onClick={toExpore} className='h-8 cursor-pointer py-8 px-2 flex justify-center items-center text-white'>
                        {collapsed ? <span className='px-2 font-bold py-1 bg-green-500 border-green-400 rounded-md text-white'>Editor</span> : <div className='flex items-center gap-1 font-bold'>
                            KU Clubs for <span className='px-1 w-fit bg-green-500 border-green-400 rounded-md text-white'>Editor</span>
                        </div>}

                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[pathname]}
                        items={Items}
                        className=''
                    />
                </Sider>
            </ConfigProvider>
            <Layout>
                <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                    className='overflow-auto'
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default WithNavbarEditor;