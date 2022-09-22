import { CButton } from "@components/ui/Button";
import { NextComponent } from "@lib/types";
import { css, keyframes, styled } from "@stitches";
import { FaSignInAlt } from "react-icons/fa";
import { useRef, useState } from "react";
import { DropdownMenu } from "./Dropdown";
import { trpc } from '@lib/trpc';

const Container = styled('div', {
    marginLeft: '1rem'
});

const shimmerAnimation = keyframes({
    '0%, 100%': {
        opacity: '0.5'
    },
    '50%': {
        opacity: '1'
    }
});

export const fadeInAnimation = keyframes({
    '0%': {
        opacity: '0'
    },
    '75%': {
        opacity: '0.9'
    },
    '100%': {
        opacity: '1'
    }
})

const LoadingShimmer = styled('div', {
    height: '32px',
    width: '32px',
    backgroundColor: '$gray',
    borderRadius: '50%',
    animation: `${shimmerAnimation} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`
});

const LoginButton: NextComponent = () => {
    const buttonStyles = css({
        fontSize: '0.9rem',
        padding: '0.1em 1em !important',
        animation: `${fadeInAnimation} 1s`,
    });

    const iconStyles = css({
        verticalAlign: '-2px',
        marginRight: '3px'
    })

    return (
        <CButton className={buttonStyles()} href='/auth/login' compact color='blue'><FaSignInAlt className={iconStyles()} /> Login</CButton>
    );
};

const ProfilePicture = styled('img', {
    width: '32px',
    height: '32px',
    maxWidth: '32px',
    maxHeight: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    cursor: 'pointer'
});

export const UserMenu: NextComponent = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const userMenuRef = useRef<HTMLImageElement>(null);
    
    const profile = trpc.auth.getMe.useQuery(); 

    if(profile.isLoading || profile.isFetching && !profile.data) return (
        <Container>
            <LoadingShimmer />
        </Container>
    );

    if(!profile.data) return (
        <Container>
            <LoginButton />
        </Container>
    )

    return (
        <Container>
            <ProfilePicture ref={userMenuRef} onClick={() => setDropdownOpen(!dropdownOpen)} src={profile.data.photoUrl ?? 'https://avatars.dicebear.com/api/identicon/notavaible.png'} />
            {dropdownOpen && <DropdownMenu userMenuRef={userMenuRef} setDropDownOpen={setDropdownOpen} />}
        </Container>
    );
};