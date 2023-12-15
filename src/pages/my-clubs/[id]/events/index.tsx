import { NextPage } from 'next'

interface Props { }

const Index: NextPage<Props> = () => {
    return (
        <>
            <div className="mx-auto flex max-w-6xl flex-col gap-5 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="text-3xl font-bold">อีเว้นท์ทั้งหมด</div>
                    </div>
                </div>
                <div className="flex gap-5 w-full">
                    อีเว้นท์ทั้งหมด
                </div>
            </div>
        </>
    )
}

export default Index