import { api } from '@/utils/api';
import { Card, Form, Input, Select, SelectProps } from 'antd'
import { AlignLeftIcon } from 'lucide-react'
import { NextPage } from 'next'

interface Props { }

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}

const DetailEvent: NextPage<Props> = () => {
    const getEventCategorieApi = api.event.getEventCategorie.useQuery()
    const getEventTypeApi = api.event.getEventTypes.useQuery()

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };
    return (
        <>
            <Card loading={getEventCategorieApi.isLoading || getEventTypeApi.isLoading} className='flex border flex-col p-5'>
                <div className='text-lg mb-5 font-bold flex gap-2'>
                    <AlignLeftIcon />
                    รายละเอียดอีเว้นท์
                </div>
                <Form.Item label="ชื่ออีเว้นท์" name="eventName" rules={[{ required: true }]}>
                    <Input size='large' />
                </Form.Item>
                <Form.Item label="หมวดหมู่" name="categories" rules={[{ required: false }]}>
                    <Select
                        onSearch={(value) => console.log(value)}
                        mode="multiple"
                        allowClear
                        placeholder="โปรดเลือกหมวดหมู่"
                        size='large'
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        optionFilterProp="label"
                        loading={getEventCategorieApi.isLoading}
                        options={getEventCategorieApi.data?.map((item) => ({ label: item.name, value: item.id }))}
                    />
                </Form.Item>
                <Form.Item label="ชนิดอีเว้นท์" name="eventTypes" rules={[{ required: false }]}>
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="โปรดเลือกชนิดอีเว้นท์"
                        size='large'
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        optionFilterProp="label"
                        loading={getEventTypeApi.isLoading}
                        options={getEventTypeApi.data?.map((item) => ({ label: item.name, value: item.id }))}
                    />
                </Form.Item>
            </Card>
        </>
    )
}

export default DetailEvent