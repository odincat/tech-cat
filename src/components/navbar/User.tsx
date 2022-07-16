import { trpc } from "@backend/utils/trpc";
import { TButton } from "@components/ui/Button";
import { NextComponent } from "@lib/types";
import { css, keyframes, styled } from "@stitches";
import { FaSignInAlt } from "react-icons/fa";

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

const fadeInAnimation = keyframes({
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
        <TButton className={buttonStyles()} href='/auth/login' compact color='blue'><FaSignInAlt className={iconStyles()} /> Login</TButton>
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

export const UserControl: NextComponent = () => {
    const profile = trpc.useQuery(['auth.getMe']);

    if(profile.isFetching && !profile.isRefetching) return (
        <Container>
            <LoadingShimmer />
        </Container>
    );

    return (
        <Container>
            {!profile.data && <LoginButton />}
            {profile.data && <ProfilePicture src='https://placekitten.com/900/1280' />}
        </Container>
    );
};