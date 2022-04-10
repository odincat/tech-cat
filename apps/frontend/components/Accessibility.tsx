import { NextComponentType } from "next";

export const SkipNavigation: NextComponentType = () => {
    return(
        <a className="absolute translate-y-[-200%] translate-x-[-200%] bg-black text-white p-2 mt-2 ml-2 rounded-[4px] transition-all duration-100 ease-in focus:translate-y-[0] focus:translate-x-[0]" href="#main-content">
            Skip Navigation
        </a>
    );
};