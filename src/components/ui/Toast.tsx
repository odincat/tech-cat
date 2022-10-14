interface ToastConfig {
    title?: string;
    message?: string;
    icon?: JSX.Element;
    classNames?: string;
    children?: JSX.Element;
    timeout?: number; // in ms
    onClick?: () => void;
    onClose?: () => void;
}

export const useToast = () => {
    const show = ({timeout = 3000, ...config}: ToastConfig) => {

    };
    const close = (delay: number = 0) => {

    };
    const toggle = 0;

};