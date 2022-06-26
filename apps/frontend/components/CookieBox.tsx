import { NextComponent } from "@lib/types";
import { css, styled } from "@stitches";
import { FaCookieBite } from "react-icons/fa";

const CookieJarContainer = styled('div', {
    position: 'fixed',
    bottom: '5rem',
    right: '1rem',
    backgroundColor: '$cookieBoxBackground',
    boxShadow: '0 2px 8px rgb(0 42 76 / 30%)',
    borderRadius: '3px',
    padding: '0.5rem 1rem',
    maxWidth: '20rem',
    fontSize: '13px',
    display: 'flex',
    gap: '0.5rem',
});

const cookieIcon = css({

});

export const CookieJar: NextComponent = () => {
    return (
        <CookieJarContainer >
            <FaCookieBite />
            <div>
                <b>Hi there!</b>
            </div>
        </CookieJarContainer>
    )
}