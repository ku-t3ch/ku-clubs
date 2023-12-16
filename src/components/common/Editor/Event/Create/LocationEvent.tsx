import { Form, Input } from 'antd'
import { AlignLeftIcon, MapPinIcon } from 'lucide-react'
import { NextPage } from 'next'
import React, { useState } from 'react'
import clsx from 'clsx'

interface Props { }

const LocationEvent: NextPage<Props> = () => {
    const [form] = Form.useForm()
    const [LocationType, setLocationType] = useState<"online" | "onsite">("onsite")

    const onOnsite = () => {
        setLocationType("onsite")
    }

    const onOnline = () => {
        setLocationType("online")
    }

    return (
        <>
            <div className='flex border flex-col p-5'>
                <div className='text-lg mb-5 font-bold flex gap-2'>
                    <MapPinIcon />
                    สถานที่จัดอีเว้นท์
                </div>
                <div className='flex justify-around gap-3 pb-3'>
                    <div onClick={onOnsite} className={clsx('p-5 cursor-pointer font-bold text-lg border-2 rounded-lg hover:bg-gray-100 w-full flex justify-center items-center', LocationType === 'onsite' && "border-blue-600")}>
                        Onsite
                    </div>
                    <div onClick={onOnline} className={clsx('p-5 cursor-pointer font-bold text-lg border-2 rounded-lg hover:bg-gray-100 w-full flex justify-center items-center', LocationType === 'online' && "border-blue-600")}>
                        Online
                    </div>

                </div>
                {LocationType === 'onsite' ?
                    <>
                        <div className='flex justify-around gap-x-3 flex-col md:flex-row'>
                            <Form.Item label="ชื่อสถานที่" name="venue_name" className='w-full' rules={[{ required: true }]}>
                                <Input size='large' />
                            </Form.Item>
                            <Form.Item label="Room/Floor/Hall" name="detailed_address" className='w-full'>
                                <Input size='large' />
                            </Form.Item>
                        </div>
                        <Form.Item label="Link Google Map" name="google_map_link" className='w-full'>
                            <Input size='large' />
                        </Form.Item>
                    </> :
                    <>
                        <Form.Item label="Online Detail" name="online_detail" className='w-full'>
                            <Input.TextArea size='large' placeholder='Online Detail' />
                        </Form.Item>
                    </>}

            </div>
        </>
    )
}

export default LocationEvent