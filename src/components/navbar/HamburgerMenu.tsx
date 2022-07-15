import { NextComponent } from '@lib/types';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { css, styled } from '@stitches';
import { NavLink } from './NavLink';
import { navMenuItems } from './static';
import { createPortal } from 'react-dom';

const Mobile = {
    Menu: styled('nav', {
        display: 'none',
        '@small': {
            display: 'block',
        },
    }),
    NavLinks: styled('div', {
        backgroundColor: '$hamburgerBackground',
        backdropFilter: 'blur(5px)',
        position: 'fixed',
        left: '0',
        right: '0',
        top: '52px',
        opacity: '0',
        display: 'flex',
        flexDirection: 'column',
        visibility: 'hidden',
        transition: 'all 300ms',
        '&.opened': {
            opacity: '1',
            visibility: 'visible',
        },
    }),
    SingleNavLink: css({
        padding: '0.5rem',
        color: '$text',
        '&.active': {
            textDecoration: 'underline',
            color: '$green',
        },
    }),
};

export const HamburgerMenu: NextComponent = () => {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleButtonClick = () => {
        setOpen(!open);
    };

    return (
        <Mobile.Menu>
            <button onClick={handleButtonClick} className='nav-mobile-button'>
                {open ? <FaTimes /> : <FaBars />}
            </button>
            {mounted
                ? createPortal(
                      <Mobile.NavLinks className={`${open ? ' opened' : ''}`}>
                          {navMenuItems.map((entry) => (
                              <NavLink
                                  className={Mobile.SingleNavLink()}
                                  key={entry.route}
                                  target={entry.route}
                                  displayName={entry.name}
                                  activeClassSelector={
                                      entry.activeClassSelector
                                  }
                              />
                          ))}
                      </Mobile.NavLinks>,
                      document.getElementById(
                          'hamburgerPortal',
                      ) as HTMLDivElement,
                  )
                : ''}
        </Mobile.Menu>
    );
};
