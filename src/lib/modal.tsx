import { ModalWrapper, ModalProps } from "@components/ui/Modal";
import { useState } from "react"

export const useModal = () => {
    const [open, setOpen] = useState<boolean>();

    const show = () => setOpen(true);
    const hide = () => setOpen(false);
    const toggle = () => setOpen(!open);

    const Render = (props: ModalProps) => {
        return (
        <>
            {open && <ModalWrapper {...props} shown={open} />} 
        </>
        );
    };

    return {
        show,
        hide,
        toggle,
        Render
    }
}