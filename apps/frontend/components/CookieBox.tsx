import { SHARED_cookiesAccepted } from "@lib/store";
import { NextComponent } from "@lib/types";
import { css, keyframes, styled } from "@stitches";
import { translateString } from "@locales/utils";
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
    const [hasAsked, setHasAsked] = useState<boolean | null>(null);
    // const [hasAccepted, setHasAccepted] = useState<boolean | null>(null);
    const [lastAsked, setLastAsked] = useState<number | undefined>(undefined);
    const [hasFetched, setHasFetched] = useState<boolean>(false);

    useEffect(() => {
        const asked = localStorage.getItem('cookiesAsked');
        const accepted = localStorage.getItem('cookiesAccepted');
        const whenAsked = localStorage.getItem('cookieLastAsked');

        if(accepted || whenAsked || asked === null) {
            setHasAsked(false);
        }

        if(asked === 'true') {
            setHasAsked(true)
        } else if(asked === 'false') {
            setHasAsked(false)
        }

        if(accepted === 'true') {
            SHARED_cookiesAccepted.set(true);
        } else if(accepted === 'false') {
            SHARED_cookiesAccepted.set(false);
        }

        const whenWasTheLastTimeTheUserHasBeenAnnoyed = new Date(parseInt(whenAsked!)).getTime();

        setLastAsked(whenWasTheLastTimeTheUserHasBeenAnnoyed);

        // Maybe we get them to accept them someday :3
        if(accepted === 'false' && whenWasTheLastTimeTheUserHasBeenAnnoyed > whenWasTheLastTimeTheUserHasBeenAnnoyed + (30 * 24 * 60 * 60 * 1000)) {
            setHasAsked(false);
        }
        setHasFetched(true);
    }, []);

    const handleAction = (accepted: boolean) => {
        SHARED_cookiesAccepted.set(accepted);
        localStorage.setItem('cookiesAccepted', accepted.toString());

        setHasAsked(true);
        localStorage.setItem('cookiesAsked', 'true');

        setLastAsked(new Date().getTime());
        localStorage.setItem('cookieLastAsked', new Date().getTime().toString());
    }

    if(!hasFetched) return null;

    if(hasAsked) return null;

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
