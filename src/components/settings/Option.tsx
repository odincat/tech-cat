import { NextComponent } from "@lib/types"
import { ReactNode } from "react"
import { RiEarthLine } from "react-icons/ri";

interface OptionProps {
    children: ReactNode;
    name: string;
    public: boolean;
    description: string | JSX.Element;
}

export const Option: NextComponent<OptionProps> = (props) => {
    return (<div className="mb-10">
        <h3 className="font-[Roboto]">{props.name} {props.public && <RiEarthLine className="align-[-0.2em]" />}</h3>
        {props.description}
        {props.children}
        </div>);
}