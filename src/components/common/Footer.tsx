import { NextPage } from "next";

interface Props {}

const Footer: NextPage<Props> = () => {
  return (
    <div className="mx-auto flex flex-col items-center w-full justify-center p-3">
      <div>© {new Date().getFullYear()} KU Tech. All right reserved.</div>
      <a href="https://tech.nisit.ku.ac.th/privacy" className="text-blue-500 underline">Privacy Policy</a>
      {/* <div>Made with 💖 for everyone</div>
      <div>by Teerut Srithongdee</div> */}
    </div>
  );
};

export default Footer;
