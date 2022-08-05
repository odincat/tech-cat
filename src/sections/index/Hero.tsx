import { CColumn } from "@components/ui/Column";
import { createDictionary, useTranslation } from "@locales/utils";
import { css, keyframes, styled } from "@stitches";

const heroBackgroundAnimation = keyframes({
    '0%': {
        backgroundPosition: '93% 0%',
    },
    '50%': {
        backgroundPosition: '0% 100%',
    },
    '100%': {
        backgroundPosition: '93% 0%',
    },
})

const Hero = {
    container: css({
        padding: '10rem 5rem',
        // background: 'linear-gradient(58deg, rgba(21,151,229,1) 0%, rgba(9,22,121,1) 100%)'
        // background: 'linear-gradient(224deg, #0e0e0e, #303030)',
        // backgroundSize: '200% 200%',
        // animation: `${heroBackgroundAnimation} 60s ease infinite`,
    }),
    InfoSection: {
        Container: styled('div', {
            textAlign: 'left',
            padding: '2rem 1rem',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
        }),
        NamePrefix: styled('h1', {
            fontFamily: 'Neucha !important',
            fontSize: '3.7rem !important',
        }),
        Name: styled('span', {
            fontFamily: 'Maven Pro',
            color: '$green',
            fontSize: '4rem'
        }),
        Introduction: styled('p', {
            fontSize: '1.5rem'
        })
    },
    ImageSection: styled('div', {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    })
}

const homeHeaderDictionary = createDictionary({
    title: {
        de: 'Hi',
        en: "Hi"
    },
    introduction: {
        de: <Hero.InfoSection.Introduction>Über mich</Hero.InfoSection.Introduction>,
        en: 'hi'
    }
});

export const SHomeHero = () => {
    const { translateString } = useTranslation();

    return (
        <CColumn className={Hero.container()} columns={'2'}>
            <Hero.InfoSection.Container>
                <Hero.InfoSection.NamePrefix>{translateString(homeHeaderDictionary.title)} <Hero.InfoSection.Name></Hero.InfoSection.Name></Hero.InfoSection.NamePrefix>
                {translateString(homeHeaderDictionary.introduction)}
            </Hero.InfoSection.Container>
            <Hero.ImageSection>
                <img src="https://placekitten.com/500/500" alt="kitten" />
            </Hero.ImageSection>
        </CColumn>
    );
}