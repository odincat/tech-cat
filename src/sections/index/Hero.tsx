import { CButton } from "@components/ui/Button";
import { CWindow } from "@components/ui/Window";
import { trpc } from "@lib/trpc";
import { NextComponent } from "@lib/types";
import { createDictionary, useTranslation } from "@locales/utils";
import { css, keyframes, theme } from "@stitches";
import { useEffect } from "react";
import { FaAngleDoubleDown, FaSpotify } from "react-icons/fa";

const homeHeroDictionary = createDictionary({
    headline: {
        en: <>Having <u>fun</u> <br /> building & exploring <i>cool</i> stuff</>,
        de: <></>
    },
    intro: {
        en: 'In my opinion, the web is the one most fascinating things that have ever been created. A place all about making information uncensored accessible, providing help, getting in touch with people and so much more. And the best part: Everyone can be a part of it and make a difference! These days there are no execuses for not having a website or a blog.',
        de: 'Das Internet ist eines der faszinierendsten Plattformen, die jemals erschaffen wurde. Ein Ort, an der es ermöglicht Informationen unzensiert zu teilen, sich gegenseitig zu helfen und mit Mitmenschen in Kontakt zu treten. Und das Beste: Jeder kann ein Teil davon sein und einen Unterschied machen! Heutzutage gibt es keine Ausreden mehr, keine Website oder einen Blog zu haben!'
    },
    exploreProjects: {
        en: 'Explore my projects',
        de: 'Meine Projekte'
    }
});

const slideInAnimation = keyframes({
    '0%': {
        opacity: '0',
        filter: 'blur(10px)'
    },
    '100%': {
        opacity: '1',
        filter: 'blur(0px)'
    }
});

const slideIn = css({
    animation: `${slideInAnimation} 500ms ease-out`
});

const Artist: NextComponent<{ name: string; url: string; index: number; length: number; }> = ({ name, url, index, length }) => {
    const isLast = index === length - 1;
    const isSecondLast = index === length - 2;
    return (
        <>
            <a href={url} target='_blank' rel="noreferrer">{name}</a>{isLast ? '' : isSecondLast ? ' & ' : ', '}
        </>
    );
}

const StatusWindow = () => {
    const spotify = trpc.spotify.getPlayingTrack.useQuery(undefined, { refetchInterval: 15 * 1000, refetchOnWindowFocus: true });
    
    useEffect(() => {
        console.log(spotify.data)
    }, [spotify.data])

    return (
        <CWindow title="Status">
            <h3 className='font-ms text-center mb-2'>NEWS</h3>
            <ul className="text-center">
                <li>NEW PROJECT: </li>
            </ul>
            <span>Check out my newest article about Typescript <a>here</a>!</span>
            { spotify.data && spotify.data.isPlaying && (
                <div className="flex items-center"><FaSpotify className="text-[#1ccc5b] text-2xl" />
                    <span className="ml-2 mt-[2px]">
                    Currently vibing to: &nbsp;
                    <a href={spotify.data.songUrl} target='_blank' rel="noreferrer">{spotify.data.songName}</a>&nbsp;
                    by &nbsp;
                    {spotify.data.artists.map((artist, index) =>(
                            <Artist key={index} name={artist.name} url={artist.url} index={index} length={spotify.data.artists.length} />
                ))}
                    </span>
                </div>
            )}
        </CWindow>
    );
}

export const Hero = () => {
    const { ts } = useTranslation();

    return (
        <div className="min-h-[calc(100vh-52px)] bg-gradient-to-r from-green-400 to-blue-600 flex flex-col">
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='px-10 pt-20 md:pt-60'>
                    <h1>{ts(homeHeroDictionary.headline)}</h1>
                    <p className='mb-5'>
                        {ts(homeHeroDictionary.intro)}
                    </p>
                    <CButton color={theme.colors.blue.value} rightIcon={<>I'm a icon</>} rightIconColor={theme.colors.yellow.value}>{ts(homeHeroDictionary.exploreProjects)}</CButton>
                </div>
                <div className='pt-10 md:pt-40'>
                    <div className={`${slideIn()} text-left w-[85%] md:w-[75%] m-auto mb-10 md:mb-0`}>
                        <StatusWindow />
                    </div>
                </div>
            </div>
            <div className="mt-auto pt-10 mb-10">
                <span className="block mb-3 text-xl">Scroll down to learn more about me</span>
                <FaAngleDoubleDown className="text-3xl animate-bounce" />
            </div>
        </div>
    );
}
