import { Option } from "@components/settings/Option";
import { SessionList } from "@components/settings/SessionManager";
import { Shell } from "@components/Shell";
import { CColumn } from "@components/ui/Column";
import { CInput } from "@components/ui/Input";
import { useUser } from "@lib/context";
import { protectedRoute } from "@lib/routeProtection";
import { NextComponent } from "@lib/types";
import { createDictionary, useTranslation } from "@locales/utils";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { RiSettings5Line } from "react-icons/ri";
import { DeleteAccount } from "@components/settings/DeleteAccount";

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
            de: <>Wie möchtest du genannt werden? Beachte, dass dieser <b>öffentlich</b> einsehbar ist</>,
            en: <>How would you like to be called? This <b>publicly</b> visible</>
        },

        aboutMe: {
            de: 'Über mich',
            en: 'About me'
        },
        aboutMeText: {
            de: <>Erzähle etwas über dich. Links und HTML funktionieren <i>nicht</i>. Dieser Text ist ebenfalls <b>öffentlich</b>.</>,
            en: <>Tell something about yourself. Links and HTML do <i>not</i> work. This text is <b>public</b>.</>
        }
    },
    yourAccount: {
        de: "Dein Account",
        en: "Your Account",
        description: {
            de: "Hier findest du all die Einstellungen, die in Relation zu den Sicherheit deines Accounts stehen",
            en: "Here you can find all the options that are related to your account and its security measures."
        },
        sessions: {
            de: "Sitzungen",
            en: "Sessions",
            description: {
                de: "Schließe böse Angreifer oder Schulfreunde aus Schande mit deinem Account zu treiben.",
                en: "Stop abuse of your account and delete Sessions that don't seem right"
            }
        },
        delete: {
            de: "Account löschen",
            en: "Delete Account",
            description: {
                de: "Löscht unwiederuflich deinen Account. Deine Posts, Kommentare und Links werden allsamt gelöscht (!)",
                en: "Deletes your account. There is no going back :P Please note that all of you posts, comments and links will be deleted aswell"
            }
        }
    }
})

const Settings: NextComponent = () => {
    const { ts } = useTranslation();
    const user = useUser();

    return (
        <Shell alignCenter={false}>
            <div className="px-20 mb-10">
                <h1 className='text'><RiSettings5Line style={{ verticalAlign: 'bottom' }} /> {ts(settingsDictionary.title)}</h1>
                <b>{ts(settingsDictionary.subtitle)}</b>
            </div>
            <CColumn className="px-20" columns={2}>
                <section className="pr-5">
                    <div className="mb-10">
                        <h2>{ts(settingsDictionary.yourProfile)}</h2>
                    </div>
                    <Option name="Name" description={ts(settingsDictionary.yourProfile.name)} public>
                        <CInput placeholder="Name" defaultValue={user?.name}></CInput>
                    </Option>
                    <Option name={ts(settingsDictionary.yourProfile.aboutMe)} description={ts(settingsDictionary.yourProfile.aboutMeText)} public>
                        <CInput placeholder="Name" defaultValue={user?.name}></CInput>
                    </Option>
                </section>

                <section className="pl-5">
                    <div className="mb-10">
                        <h2>{ts(settingsDictionary.yourAccount)}</h2>
                        <b>{ts(settingsDictionary.yourAccount.description)}</b>
                    </div>
                    <Option name={ts(settingsDictionary.yourAccount.sessions)} description={ts(settingsDictionary.yourAccount.sessions.description)} public={false}>
                        <SessionList />
                    </Option>
                    <Option name={ts(settingsDictionary.yourAccount.delete)} description={ts(settingsDictionary.yourAccount.delete.description)} public={false}>
                        <DeleteAccount />
                    </Option>
                </section>
            </CColumn>
        </Shell>
    )
}

export default Settings;
