import { DatePicker, DatePickerProps, Form, Input } from 'antd'
import { ClockIcon } from 'lucide-react'
import { NextPage } from 'next'

import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import dayjs from 'dayjs';

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

interface Props { }

const dateFormat = 'DD/MM/YYYY';

const DataAndTimeEvent: NextPage<Props> = () => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <>
            <div className='flex border flex-col p-5'>
                <div className='text-lg mb-5 font-bold flex gap-2'>
                    <ClockIcon />
                    วันและเวลาจัดอีเว้นท์
                </div>
                <div className='flex w-full gap-5'>
                    <Form.Item className='w-full' label="วันที่เริ่ม" name="dateStart" rules={[{ required: true }]}>
                        <DatePicker size='large' onChange={onChange} className='w-full' format={dateFormat} defaultValue={dayjs()} />
                    </Form.Item>
                    <Form.Item className='w-full' label="เวลาเริ่ม" name="timeStart" rules={[{ required: false }]}>
                        <Input size='large' />
                    </Form.Item>
                </div>
                <div className='flex w-full gap-5'>
                    <Form.Item className='w-full' label="วันที่สินสุด" name="dateEnd" rules={[{ required: true }]}>
                        <DatePicker size='large' onChange={onChange} className='w-full' format={dateFormat} defaultValue={dayjs()} />
                    </Form.Item>
                    <Form.Item className='w-full' label="เวลาสินสุด" name="timeEnd" rules={[{ required: false }]}>
                        <Input size='large' />
                    </Form.Item>
                </div>
            </div>
        </>
    )
}

export default DataAndTimeEvent