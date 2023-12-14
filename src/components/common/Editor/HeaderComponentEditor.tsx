import useEditorStore from '@/store/useEditorStore'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { LogOutIcon } from 'lucide-react'
import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useMediaQuery } from 'usehooks-ts'

interface Props {
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}

const HeaderComponentEditor: NextPage<Props> = ({ setCollapsed, collapsed }) => {
    const { data: session } = useSession();
    const { header } = useEditorStore(state => state)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <Header style={{ padding: 0, background: colorBgContainer }} className='flex justify-between items-center sticky top-0 z-50'>
            <div className='flex gap-2 flex-1 truncate'>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
                <Link href={`/club/${header?.id}`} className='flex items-center gap-3'>
                    <div className='flex-1'>
                        <img className='w-[2rem] h-[2rem] border rounded-xl' src={header?.logo} alt="" />
                    </div>
                    <div className='truncate'>{header?.name}</div>
                </Link>
            </div>

            <div className='flex mr-5'>
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "1",
                                icon: <LogOutIcon />,
                                label: (
                                    <div
                                        onClick={() =>
                                            signOut({
                                                callbackUrl: "/",
                                            })
                                        }
                                    >
                                        Sign Out
                                    </div>
                                ),
                                danger: true,
                            },
                        ],
                    }}
                >
                    <a
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center gap-2"
                    >
                        <Avatar
                            shape="circle"
                            size="default"
                            src={session?.user.image}
                            className="cursor-pointer"
                        />
                        {isMobile ? "" : session?.user.name}
                    </a>
                </Dropdown>
            </div>
        </Header>
    )
}

export default HeaderComponentEditor