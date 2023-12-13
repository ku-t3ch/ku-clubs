
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { NextPage } from "next";
import { createContext, useState } from "react";

type WithNavbarContextProp = {
    hasPadding: boolean;
    setHasPadding: (value: boolean) => void;
}

export const WithNavbarContext = createContext<WithNavbarContextProp | null>(null)
interface Props {
    children: React.ReactNode;
}

const WithNavbar: NextPage<Props> = ({ children }) => {
    const [hasPadding, setHasPadding] = useState<boolean>(true);

    return (
        <WithNavbarContext.Provider value={{ hasPadding, setHasPadding }}>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-grow px-5">{children}</div>
                <Footer />
            </div>
        </WithNavbarContext.Provider>
    );
};

export default WithNavbar;
