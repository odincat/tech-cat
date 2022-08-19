import { NextComponent } from "@lib/types";
import { ReactNode } from "react";
import ReactDOM from "react-dom";

export interface ModalProps {
    children: JSX.Element | string;
    containerClassName?: string;
}

export const Modal: NextComponent<ModalProps> = (props) => {
    const portalElement = document.getElementById('modalPortal') as HTMLDivElement;

    if(portalElement) return null;

    return ReactDOM.createPortal((<div className={`${props.containerClassName} w-screen h-screen dark:bg-gray-600/50`}>
        {props.children}
    </div>), portalElement);
}