import DataAndTimeEvent from '@/components/common/Editor/Event/Create/DataAndTimeEvent'
import DetailEvent from '@/components/common/Editor/Event/Create/DetailEvent'
import LocationEvent from '@/components/common/Editor/Event/Create/LocationEvent'
import { Button, Form, Input } from 'antd'
import { AlignLeftIcon, Clock10Icon, ClockIcon } from 'lucide-react'
import { NextPage } from 'next'

interface Props { }

const Create: NextPage<Props> = () => {
    const [form] = Form.useForm()
    const onFinish = (values: any) => {
        console.log(form.getFieldsValue());
    }
    return (
        <>
            <div className="mx-auto flex max-w-6xl flex-col gap-5 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="text-3xl font-bold">เพิ่มอีเว้นท์</div>
                    </div>
                </div>
                <Form form={form} onFinish={onFinish} layout='vertical' className='flex flex-col gap-10'>
                    <DetailEvent />
                    <DataAndTimeEvent />
                    <LocationEvent />
                    <Button type='primary' htmlType='submit' className='w-fit' size='large'>บันทึก</Button>
                </Form>

            </div>
        </>
    )
}

export default Create