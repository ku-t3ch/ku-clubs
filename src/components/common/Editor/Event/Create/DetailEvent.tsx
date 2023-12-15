import { Form, Input, Select, SelectProps } from 'antd'
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
    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };
    return (
        <>
            <div className='flex border flex-col p-5'>
                <div className='text-lg mb-5 font-bold flex gap-2'>
                    <AlignLeftIcon />
                    รายละเอียดอีเว้นท์
                </div>
                <Form.Item label="ชื่ออีเว้นท์" name="eventName" rules={[{ required: true }]}>
                    <Input size='large' />
                </Form.Item>
                <Form.Item label="หมวดหมู่" name="categories" rules={[{ required: false }]}>
                    <Select
                        mode="multiple"
                        allowClear
                        size='large'
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        options={options}
                    />
                </Form.Item>
                <Form.Item label="ชนิดอีเว้นท์" name="eventTypes" rules={[{ required: false }]}>
                    <Select
                        mode="multiple"
                        allowClear
                        size='large'
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        options={options}
                    />
                </Form.Item>
            </div>
        </>
    )
}

export default DetailEvent