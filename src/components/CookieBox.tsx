import { SHARED_cookiesAccepted } from '@lib/store';
import { NextComponent } from '@lib/types';
import { css, keyframes, styled } from '@stitches';
import { createDictionary, useTranslation } from '@locales/utils';
import { useEffect, useState } from 'react';
import { FaCookieBite } from 'react-icons/fa';
import { CButton } from './ui/Button';
import Link from 'next/link';

const cookieBoxDictionary = createDictionary({
    title: {
        de: 'Cookie-Hinweis',
        en: 'Cookie notice',
    },
    body: {
        de: (
            <p>
                Diese Website verwendet <u>Cookies</u> & <u>Analytiktools</u>{' '}
                die dazu dienen dir eine <b>bessere Nutzererfahrung</b> zu
                ermöglichen. Eine transparente Übersicht der verwendeten Cookies
                & Tracker findest du <Link href='/cookies'>hier</Link>.
            </p>
        ),
        en: (
            <p>
                This website uses <u>cookies</u> and <u>tracking tools</u> to{' '}
                <b>improve</b> your experience. A detailed overview of the
                trackers used can be found <Link href='/cookies'>here</Link>.
            </p>
        ),
    },
    accept: {
        de: 'Akzeptieren',
        en: 'Accept',
    },
    decline: {
        de: 'Ablehnen',
        en: 'Decline',
    },
});

const fadeIn = keyframes({
    '0%': {
        opacity: '0',
    },
    '100%': {
        opacity: '1',
    },
});

const CookieJarContainer = styled('div', {
    position: 'fixed',
    bottom: '5rem',
    right: '1rem',
    backgroundColor: '$cookieBoxBackground',
    boxShadow: '0 2px 8px rgb(0 42 76 / 30%)',
    borderRadius: '3px',
    padding: '1rem',
    maxWidth: '20rem',
    fontSize: '16px',
    animation: `${fadeIn} 500ms ease-in`,

    '@small': {
        bottom: '1rem',
        left: '50%',
        transform: 'translate(-50%, 0px)',
        width: '90%',
    },
});

const MessageContainer = styled('div', {
    display: 'flex',
    gap: '1rem',
});

const cookieIcon = css({
    color: '#DD8A15',
    fontSize: '1.2rem',
    marginTop: '5px',
    minWidth: '10%',
});

const Content = styled('div', {});

const Heading = styled('span', {
    fontSize: '17px',
    fontWeight: 'bold',
});

const ButtonContainer = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    placeItems: 'center',
    marginTop: '1rem',

    '& > button': {
        width: '100%',
    },
});

export const CookieJar: NextComponent = () => {
    const [hasFetched, setHasFetched] = useState<boolean>(false);
    const [hasAsked, setHasAsked] = useState<boolean | null>(true);

    const { ts } = useTranslation();

    useEffect(() => {
        const asked = localStorage.getItem('cookiesAsked');
        const accepted = localStorage.getItem('cookiesAccepted');
        // const whenAsked = localStorage.getItem('cookieLastAsked');

        setHasAsked(asked === 'true');

        SHARED_cookiesAccepted.set(accepted === 'true');

        setHasFetched(true);

        // Maybe we get them to accept them someday :3

        // const whenWasTheLastTimeTheUserHasBeenAnnoyed = new Date(parseInt(whenAsked!)).getTime();
        // const annoyAgain = !SHARED_cookiesAccepted.get() && whenWasTheLastTimeTheUserHasBeenAnnoyed > whenWasTheLastTimeTheUserHasBeenAnnoyed + (30 * 24 * 60 * 60 * 1000);

        // logger.log(`Last time: ${whenWasTheLastTimeTheUserHasBeenAnnoyed} --- Last time in 30 days: ${whenWasTheLastTimeTheUserHasBeenAnnoyed + (30 * 24 * 60 * 60 * 1000)}`, 'information')

        // console.log(annoyAgain)

        // // if(!annoyAgain) return;

        // // setHasAsked(annoyAgain.valueOf());
        // // console.log(hasAsked)
    }, []);

    const handleAction = (accepted: boolean) => {
        SHARED_cookiesAccepted.set(accepted);
        localStorage.setItem('cookiesAccepted', accepted ? 'true' : 'false');

        setHasAsked(true);
        localStorage.setItem('cookiesAsked', 'true');

        localStorage.setItem(
            'cookieLastAsked',
            new Date().getTime().toString(),
        );
    };

    if (!hasFetched || hasAsked === true) return null;

    return (
        <CookieJarContainer>
            <MessageContainer>
                <FaCookieBite className={cookieIcon()} />
                <Content>
                    <Heading>
                        {ts(cookieBoxDictionary.title)}
                    </Heading>
                    {ts(cookieBoxDictionary.body)}
                </Content>
            </MessageContainer>
            <ButtonContainer>
                <CButton
                    onClick={() => handleAction(true)}
                    color='blue'
                    compact>
                    {ts(cookieBoxDictionary.accept)}
                </CButton>
                <CButton
                    onClick={() => handleAction(false)}
                    color='blue'
                    compact>
                    {ts(cookieBoxDictionary.decline)}
                </CButton>
            </ButtonContainer>
        </CookieJarContainer>
    );
};
