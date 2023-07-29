import { Input } from "@/components/form/Input";
import RichTextEditor from "@/components/form/RichTextEditor";
import Select from "@/components/form/Select";

import { Form } from "antd";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";
interface Props {}

const Add: NextPage<Props> = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 px-3 py-3">
      <div className="text-3xl font-bold">เพิ่มชมรม</div>
      <div className="flex gap-5">
        <Form layout="vertical" className="flex w-full flex-col rounded-md border p-5 relative">
          <Form.Item label={<div className="text-lg font-bold">ชื่อชมรม</div>}>
            <Input placeholder="ชื่อชมรม" type={"text"} className="w-full" />
          </Form.Item>
          <Form.Item label={<div className="text-lg font-bold">ประเภทชมรม</div>}>
           <Select options={options} isMulti />
          </Form.Item>
          <Form.Item label={<div className="text-lg font-bold">รายละเอียด</div>}>
            <RichTextEditor onChange={(c) => console.log(c)} />
          </Form.Item>
          <Form.Item label={<div className="text-lg font-bold">เลือกวิทยาเขต</div>}>
              <Input placeholder="เลือกวิทยาเขต" type={"text"} className="w-full" />
          </Form.Item>
        </Form>
        <div className="hidden w-1/3 flex-col md:flex">
          <b>Optimize Your Event Name</b>
          <p>
            Adding short description to your event name will help people learn more about your event
            by just looking at its title. This will boost traffic to your event page. Event name
            must be within 144 characters long.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Add;
