import { NextPage } from "next";

interface Props {}

const Footer: NextPage<Props> = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl justify-center px-3">
      {/* <div>© 2023 KU Tech. All right reserved.</div> */}
    </div>
  );
};

export default Footer;
