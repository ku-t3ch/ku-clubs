import React, { useState } from 'react';
import { Layout, Menu, Button, theme, ConfigProvider } from 'antd';
import { NextPage } from 'next';
import { ChevronLeftIcon, PlusIcon, UsersRoundIcon } from 'lucide-react';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const { Sider, Content } = Layout;

const HeaderComponent = dynamic(() => import('@/components/common/Editor/HeaderComponentEditor'), { ssr: false })

interface Props {
    children: React.ReactNode;
    title?: string
}

const WithNavbarEditor: NextPage<Props> = ({ children }) => {
    const { push, back } = useRouter()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const Items: ItemType<MenuItemType>[] = [
        {
            key: '/my-clubs',
            icon: <UsersRoundIcon size={15} />,
            label: 'ชมรมของฉัน',
            onClick: () => push('/my-clubs'),
        },
        {
            key: '/club/add',
            icon: <PlusIcon size={15} />,
            label: 'เพิ่มชมรม',
            onClick: () => push('/club/add'),
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
                        {collapsed ? <span className='px-2 font-bold py-1 bg-green-500 border-green-400 rounded-md text-white'>Editor</span> : <div className='flex items-center gap-1 font-bold'>
                            KU Clubs for <span className='px-1 w-fit bg-green-500 border-green-400 rounded-md text-white'>Editor</span>
                        </div>}

                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={Items}
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