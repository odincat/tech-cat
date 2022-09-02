import { NextComponent } from "@lib/types";
import { createPortal } from 'react-dom';

export interface ModalProps {
    children: JSX.Element | string;
    containerClassName?: string;
    shown?: boolean;
}

const Modal: NextComponent<ModalProps> = (props) => {
    return (
        <div className={`${props.containerClassName ?? ''} w-screen h-screen dark:bg-gray-600/50 fixed top-0 right-0 left-0 z-50`}>
            {props.children}
        </div>
    );
}

export const ModalWrapper: NextComponent<ModalProps> = (props) => {
    return createPortal(<Modal {...props} />, document.getElementById('modalPortal') as HTMLDivElement);
}