import { NextPage } from "next";
import { Modal as AntdModal } from "antd";

interface Props {
  show: boolean;
  children: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  title?: string;
}

const Modal: NextPage<Props> = ({ show, children, onCancel, onOk, title }) => {
  return (
    <AntdModal title={title} centered open={show} onOk={onOk} onCancel={onCancel} width={1000}>
      {children}
    </AntdModal>
  );
};

export default Modal;