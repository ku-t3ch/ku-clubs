import { Form, Input } from 'antd'
import { AlignLeftIcon, MapPinIcon } from 'lucide-react'
import { NextPage } from 'next'

interface Props { }

const LocationEvent: NextPage<Props> = () => {
    return (
        <>
            <div className='flex border flex-col p-5'>
                <div className='text-lg mb-5 font-bold flex gap-2'>
                    <MapPinIcon />
                    สถานที่จัดอีเว้นท์
                </div>
                <Form.Item label="ชื่ออีเว้นท์" name="eventName" rules={[{ required: true }]}>
                    <Input size='large' />
                </Form.Item>
                <Form.Item label="หมวดหมู่" name="categories" rules={[{ required: false }]}>
                    <Input size='large' />
                </Form.Item>
                <Form.Item label="ชนิดอีเว้นท์" name="eventTypes" rules={[{ required: false }]}>
                    <Input size='large' />
                </Form.Item>
            </div>
        </>
    )
}

export default LocationEvent