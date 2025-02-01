import Logo from "@/components/logo";
import { NextPage } from "next";

const Page: NextPage = ({}) => {
    return (
        <div className="grid min-h-svh md:grid-cols-2">
            <div className="border-border h-full border-r">
                <nav className="bg-background_darker border-border flex items-center gap-4 border-b p-4">
                    <Logo />
                    <h1 className="overflow-hidden leading-none font-semibold whitespace-nowrap select-none">
                        GitHub Profile README Builder
                    </h1>
                </nav>
            </div>
            <div className="hidden h-full p-4 md:block">Preview Section</div>
        </div>
    );
};

export default Page;
