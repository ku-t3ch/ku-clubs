import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

const WithNavbar: NextPage<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default WithNavbar;
