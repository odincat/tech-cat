// Styles from:
/*
  98.css
  Copyright Jordan Scales <thatjdanisso.cool>
  https://github.com/jdan/98.css/blob/main/LICENSE
*/
import { NextComponent } from "@lib/types";
import { styled } from "@stitches";

export interface WindowProps {
    title?: string;
    children?: React.ReactNode;
}

const WindowControl = styled('div', {
    display: 'block',
    minHeight: '14px',
    minWidth: '16px',
    padding: '0',
    backgroundColor: '#c0c0c0',
    boxShadow: 'inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px grey,inset 2px 2px #dfdfdf',
    '&:active': {
        boxShadow: 'inset -1px -1px #fff,inset 1px 1px #0a0a0a,inset -2px -2px #dfdfdf,inset 2px 2px grey'
    },
    variants: {
        type: {
            minimize: {
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='6' height='2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000' d='M0 0h6v2H0z'/%3E%3C/svg%3E")`,
                backgroundPosition: 'bottom 3px left 4px',
                backgroundRepeat: 'no-repeat'
            },
            maximize: {
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='9' height='9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 0H0v9h9V0zM8 2H1v6h7V2z' fill='%23000'/%3E%3C/svg%3E")`,
                backgroundPosition: 'top 2px left 3px',
                backgroundRepeat: 'no-repeat'
            },
            close: {
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='8' height='7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 0h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0V0z' fill='%23000'/%3E%3C/svg%3E")`,
                backgroundPosition: 'top 3px left 4px',
                backgroundRepeat: 'no-repeat',
                marginLeft: '2px'
            }
        }
    }
});

export const CWindow: NextComponent<WindowProps> = ({ title, children, ...props }) => {
    return (
        <>
            {/* Window */}
            <div className={`bg-[#c0c0c0] shadow-window p-[3px] text-[11px] font-ms`} {...props}>
                {/* Title bar */}
                <div className='flex items-center justify-between bg-[linear-gradient(90deg,#000180,#1084d0)] p-[3px] pr-[2px]'>
                    {/* Title */}
                    <h2 className='text-white font-bold font-ms text-[11px] m-0 tracking-[0]'>{title}</h2>
                    {/* Controls */}
                    <div className='flex'>
                        <WindowControl type="minimize" />
                        <WindowControl type="maximize" />
                        <WindowControl type="close" />
                    </div>
                </div>
                {/* Content */}
                <div className='m-2 text-[#222] text-[1rem]'>
                    {children}
                </div>
            </div>
        </>
    )
}