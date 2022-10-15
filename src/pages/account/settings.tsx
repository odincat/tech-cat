import { Option } from "@components/settings/Option";
import { SessionList } from "@components/settings/SessionManager";
import { Shell } from "@components/Shell";
import { CColumn } from "@components/ui/Column";
import type { inferProcedureOutput } from '@trpc/server';
import { CInput } from "@components/ui/Input";
import { useUser } from "@lib/context";
import { protectedRoute } from "@lib/routeProtection";
import { NextComponent } from "@lib/types";
import { createDictionary, useTranslation } from "@locales/utils";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { RiSettings5Line } from "react-icons/ri";

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const auth = await protectedRoute(ctx, "USER");
    if (auth?.redirect) return auth;
    return {
        props: {}
    };
}

const settingsDictionary = createDictionary({
    title: {
        de: 'Einstellungen',
        en: 'Settings'
    },
    subtitle: {
        de: 'Bearbeite Einstellungen und aktualisiere dein Profil',
        en: 'Edit preferences and update your profile'
    },
    yourProfile: {
        de: 'Dein Profil',
        en: 'Your profile',

        name: {
            de: <p>Wie möchtest du genannt werden? Beachte, dass dieser <b>öffentlich</b> einsehbar ist</p>,
            en: <p>How would you like to be called? This <b>publicly</b> visible</p>
        },

        aboutMe: {
            de: 'Über mich',
            en: 'About me'
        },
        aboutMeText: {
            de: <p>Erzähle etwas über dich. Links und HTML funktionieren <i>nicht</i>. Dieser Text ist ebenfalls <b>öffentlich</b>.</p>,
            en: <p>Tell something about yourself. Links and HTML do <i>not</i> work. This text is <b>public</b>.</p>
        }
    },
})

const Settings: NextComponent = () => {
    const { translateString } = useTranslation();
    const user = useUser();

    return (
        <Shell alignCenter={false}>
            <CColumn className="px-20 mb-10">
                <h1 className='text'><RiSettings5Line style={{ verticalAlign: 'bottom' }} /> {translateString(settingsDictionary.title)}</h1>
                <b>{translateString(settingsDictionary.subtitle)}</b>
            </CColumn>
            <CColumn className="px-20" columns={2}>
                <section className="pr-5">
                    <h2 className="mb-10">{translateString(settingsDictionary.yourProfile)}</h2> 
                    <Option name="Name" description={translateString(settingsDictionary.yourProfile.name)} public>
                        <CInput className="mt-3" placeholder="Name" defaultValue={user?.name}></CInput>
                    </Option>
                    <Option name={translateString(settingsDictionary.yourProfile.aboutMe)} description={translateString(settingsDictionary.yourProfile.aboutMeText)} public>
                        <CInput className="mt-3" placeholder="Name" defaultValue={user?.name}></CInput>
                    </Option>

                </section>

                <section className="pl-5">
                    <SessionList />
                </section>
            </CColumn>
        </Shell>
    )   
}

export default Settings;