import { SHARED_cookiesAccepted } from "@lib/store";
import { NextComponent } from "@lib/types";
import { css, keyframes, styled } from "@stitches";
import { useTranslation } from "@locales/utils";
import { useEffect, useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { TButton } from "./ui/Button";
import { SHARED_dictionary } from "@locales/global.dictionary";

const fadeIn = keyframes({
    '0%': {
        opacity: '0'
    },
    '100%': {
        opacity: '1'
    }
})

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

    }
});

const MessageContainer = styled('div', {
    display: 'flex',
    gap: '1rem',
})

const cookieIcon = css({
    color: '#DD8A15',
    fontSize: '1.2rem',
    marginTop: '5px',
    minWidth: '10%'
});

const Content = styled('div', {
    
})

const Heading = styled('span', {
    fontSize: '17px',
    fontWeight: 'bold'
});

const ButtonContainer = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    placeItems: 'center',
    marginTop: '1rem',

    '& > button': {
        width: '100%'
    }
})

export const CookieJar: NextComponent = () => {
    const [hasFetched, setHasFetched] = useState<boolean>(false);
    const [hasAsked, setHasAsked] = useState<boolean | null>(true);

    const { translateString } = useTranslation();

    useEffect(() => {
        const asked = localStorage.getItem('cookiesAsked');
        const accepted = localStorage.getItem('cookiesAccepted');
        const whenAsked = localStorage.getItem('cookieLastAsked');
    
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

        localStorage.setItem('cookieLastAsked', new Date().getTime().toString());
    }

    if(!hasFetched || hasAsked === true) return null;

    return (
        <CookieJarContainer >
            <MessageContainer>
            <FaCookieBite className={cookieIcon()} />
            <Content>
                <Heading>{translateString(SHARED_dictionary.cookieBox.title)}</Heading>
                {translateString(SHARED_dictionary.cookieBox.body)}
            </Content>
            </MessageContainer>
            <ButtonContainer>
                <TButton onClick={() => handleAction(true)} color='blue' compact>{translateString(SHARED_dictionary.cookieBox.accept)}</TButton>
                <TButton onClick={() => handleAction(false)} color='blue' compact>{translateString(SHARED_dictionary.cookieBox.decline)}</TButton>
            </ButtonContainer>
        </CookieJarContainer>
    )
}
