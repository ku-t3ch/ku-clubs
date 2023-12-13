import React, { useState } from 'react';
import { Layout, Menu, Button, theme, ConfigProvider } from 'antd';
import { NextPage } from 'next';
import { BellRingIcon, CheckIcon, ChevronLeftIcon, PlusIcon, UsersIcon, UsersRoundIcon } from 'lucide-react';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const { Sider, Content } = Layout;

const HeaderComponentAdmin = dynamic(() => import('@/components/common/Admin/HeaderComponentAdmin'), { ssr: false })

interface Props {
    children: React.ReactNode;
    title?: string
}

const WithNavbarAdmin: NextPage<Props> = ({ children }) => {
    const { push, back, pathname } = useRouter()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const Items: ItemType<MenuItemType>[] = [
        {
            key: '/admin',
            icon: <CheckIcon size={15} />,
            label: 'อนุมัติชมรม',
            onClick: () => push('/admin'),
        },
        {
            key: '/admin/club/all',
            icon: <UsersRoundIcon size={15} />,
            label: 'ชมรมทั้งหมด',
            onClick: () => push('/admin/club/all'),
        },
        {
            key: '/admin/user/all',
            icon: <UsersRoundIcon size={15} />,
            label: 'ผู้ใช้ทั้งหมด',
            onClick: () => push('/admin/user/all'),
        },
        {
            key: '/admin/management',
            icon: <UsersIcon size={15} />,
            label: 'จัดการผู้ดูแล',
            onClick: () => push('/admin/management'),
        },
        {
            key: '/admin/news',
            icon: <BellRingIcon size={15} />,
            label: 'จัดการข่าวสาร coming soon',
            onClick: () => push('/admin/news'),
            disabled: true
        },
    ]

    const toExpore = () => {
        push('/explore')
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
                        {collapsed ? <span className='px-2 font-bold py-1 bg-yellow-500 border-yellow-400 rounded-md text-white'>Admin</span> : <div className='flex items-center gap-1 font-bold'>
                            KU Clubs for <span className='px-1 w-fit bg-yellow-500 border-yellow-400 rounded-md text-white'>Admin</span>
                        </div>}
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[pathname]}
                        items={Items}
                    />
                </Sider>
            </ConfigProvider>
            <Layout>
                <HeaderComponentAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
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

export default WithNavbarAdmin;