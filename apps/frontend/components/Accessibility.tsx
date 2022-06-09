import { css } from '@emotion/react';
import { NextComponent } from '@lib/types';
import { colors } from '@styling/variables';

export const SkipNavigation: NextComponent = () => {
    const styledSkipNavigationButton = css`
        position: absolute;
        transform: translateX(-200%) translateY(-200%);
        padding: 0.5rem;
        margin-top: 0.5rem;
        margin-left: 0.5rem;
        border-radius: 4px;
        transition: all 100ms ease-in;
        background-color: ${colors.gray};
        color: ${colors.white};

        &:focus {
            transform: translateX(0) translateY(0);
        }
    `;

    return (
        <a css={styledSkipNavigationButton} href='#main-content'>
            Skip Navigation
        </a>
    );
};
