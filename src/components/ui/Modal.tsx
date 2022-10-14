import { NextComponent } from "@lib/types";
import { useState } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
    containerClassName?: string;
    shown?: boolean;
    onClick?: () => void;
    blockBgClosing?: boolean;
}

interface MessageProps {
    title?: string;
    description?: string;
    icon?: JSX.Element;
}

export const Message: NextComponent<MessageProps> = (props) => {
    return (
        <div onClick={(e) => e.stopPropagation()} className='dark:bg-gray-800 p-7 max-w-[70%] rounded-[4px] shadow-md'>
            <h3 className="text-2xl font-bold"><span>{props.icon}</span> {props.title}</h3>
            <p className={`text-lg ${props.children && 'mb-3'}`}>
                {props.description}
            </p>
            {props.children}
        </div>
    )
}

export const Modal: NextComponent<ModalProps> = (props) => {
    const Component = <div onClick={props.onClick} className={`${props.containerClassName ?? ''} w-screen h-screen fixed top-0 right-0 left-0 z-50 grid place-items-center`}>
            {props.children}
        </div>
    return createPortal(Component, document.getElementById('modalPortal')!);
}

export const useModal = () => {
    const [open, setOpen] = useState<boolean>();

    const show = () => setOpen(true);
    const close = () => setOpen(false);
    const toggle = () => setOpen(!open);

    const Render: NextComponent<ModalProps> = ({blockBgClosing = false, ...props}) => {
        return (
            <>
                {open && <Modal {...props} onClick={() => !blockBgClosing && close()} />}
            </>);
    };

    return {
        show,
        close,
        toggle,
        Render
    };
};