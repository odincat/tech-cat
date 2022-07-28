import { useUser } from "@lib/context";
import { NextComponent } from "@lib/types";
import { isPermitted } from "@lib/utils";
import { createDictionary, useTranslation } from "@locales/utils";
import { Role } from "@prisma/client";
import { trpc } from "@server/utils/trpc";
import { styled } from "@stitches";
import { useRouter } from "next/router";
import { Dispatch, MutableRefObject, ReactNode, SetStateAction, useEffect, useRef } from "react";
import { RiAdminFill, RiBookOpenFill, RiDashboard2Fill, RiDoorOpenFill, RiHammerFill, RiLinkM, RiQuillPenFill, RiSettings5Fill, RiShieldUserFill, RiTerminalBoxFill, RiUser3Fill, RiVipDiamondFill } from "react-icons/ri";

// i18n
const dropdownDictionary = createDictionary({
    profileItem: {
        loggedInAs: {
            de: 'Angemeldet als',
            en: 'Logged in as'
        },
        roleTag: {
            admin: {
                de: 'Administrator',
                en: 'Administrator'
            },
            author: {
                de: 'Autor',
                en: 'Author'
            },
            friend: {
                de: 'Freund',
                en: 'Friend'
            },
            normie: {
                de: 'Benutzer',
                en: 'User'
            }
        }
    },
    items: {
        goToDashboard: {
            de: 'Zum Dashboard',
            en: 'Go to dashboard'
        },
        goToSettings: {
            de: 'Einstellungen',
            en: 'Settings'
        },
        newArticle: {
            de: 'Neuer Artikel',
            en: 'Write new article'
        },
        viewArticles: {
            de: 'Alle Artikel',
            en: 'View all articles'
        },
        viewComments: {
            de: 'Kommentare verwalten',
            en: 'Manage comments'
        },
        createShortlink: {
            de: 'Kurzlink erstellen',
            en: 'Create shortlink'
        },
        goToAdminPanel: {
            de: 'Zum Admin-Panel',
            en: 'Go to admin panel'
        },
        modifyUser: {
            en: 'Modify user',
            de: 'Benutzer bearbeiten'
        },
        signOut: {
            de: 'Abmelden',
            en: 'Sign out'
        }
    }
});

// Styled components
const Dropdown = {
    Container: styled('div', {
        position: 'absolute',
        top: '48px',
        right: '10px',
        width: '300px',
        maxHeight: '85vh',
        overflowY: 'auto',
        background: '$dropdownBackground',
        color: '$text',
        padding: '1rem',
        borderRadius: '4px',

        '&::-webkit-scrollbar': {
            width: '5px',
            padding: '5px'
        },
        '&::-webkit-scrollbar-thumb': {
            background: '$dropdownIconBackground',
            borderRadius: '4px',
            backgroundClip: 'content-box'
        }
    }),
    MenuItem: {
        Item: styled('a', {
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '3px',
            transition: 'background 300ms',
            padding: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
        
            '&:hover': {
                backgroundColor: '$dropdownItemBackground'
            }
        }),
        LeftIcon: styled('span', {
            borderRadius: '50%',
            backgroundColor: '$dropdownIconBackground',
            padding: '5px',
            height: '32px',
            width: '32px',
            margin: '2px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'filter 300ms',
            marginRight: '10px',
    
            '&:hover': {
                filter: 'brightness(1.2)'
            }
        }),
        RightIcon: styled('span', {
            marginLeft: 'auto'
        })
    },
    ProfileItem: {
        Item: styled('a', {
            display: 'flex',
            alignItems: 'center',
            borderRadius: '3px',
            transition: 'background 300ms',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: '10px',
            backgroundColor: '$dropdownItemBackground'
        }),
        ProfilePicture: styled('img', {
            borderRadius: '50%',
            backgroundColor: '$dropdownIconBackground',
            padding: '7px',
            height: '40px',
            width: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'filter 300ms',
            marginRight: '1rem',
    
            '&:hover': {
                filter: 'brightness(1.2)'
            }
        }),
        Content: styled('div', {
            display: 'flex',
            flexDirection: 'column'
        }),
        RoleTag: styled('span', {
            padding: '0 5px',
            display: 'inline-block',
            marginTop: '5px',
            fontSize: '14px',
            borderWidth: '1px',
            borderRadius: '3px',
            userSelect: 'none',
            
            variants: {
                role: {
                    'ADMIN': {
                        color: '$red',
                        borderColor: '$red',
                    },
                    'AUHTOR': {
                        color: '$green',
                        borderColor: '$green'
                    },
                    'FRIEND': {
                        color: '$yellow',
                        borderColor: '$yellow'
                    },
                    'USER': {
                        color: '$blue',
                        borderColor: '$blue'
                    }
                }
            }
        })
    },
    Spacer: styled('hr', {
        width: '90%',
        margin: '10px auto',
        borderColor: '#333333'
    })
};

// Child components
const RoleDisplay: NextComponent<{ role: Role }> = ({ role }) => {
    const { translateString } = useTranslation();

    switch (role) {
        case 'ADMIN':
            return <Dropdown.ProfileItem.RoleTag role='ADMIN'><RiAdminFill /> {translateString(dropdownDictionary.profileItem.roleTag.admin)}</Dropdown.ProfileItem.RoleTag>;
        case 'AUTHOR':
            return <Dropdown.ProfileItem.RoleTag role='AUHTOR'><RiQuillPenFill /> {translateString(dropdownDictionary.profileItem.roleTag.author)}</Dropdown.ProfileItem.RoleTag>;
        case 'FRIEND':
            return <Dropdown.ProfileItem.RoleTag role='FRIEND'><RiVipDiamondFill /> {translateString(dropdownDictionary.profileItem.roleTag.friend)}</Dropdown.ProfileItem.RoleTag>;
        case 'USER':
            return <Dropdown.ProfileItem.RoleTag role='USER'><RiUser3Fill /> {translateString(dropdownDictionary.profileItem.roleTag.normie)}</Dropdown.ProfileItem.RoleTag>;
    }
}

const UserProfileItem: NextComponent<{ children: ReactNode; profilePictureUrl: string; onClick: () => void; }> = ({ children, profilePictureUrl, onClick }) => {

    return (
        <Dropdown.ProfileItem.Item onClick={onClick}>
            <Dropdown.ProfileItem.ProfilePicture src={profilePictureUrl} />
            <Dropdown.ProfileItem.Content>{ children }</Dropdown.ProfileItem.Content>
        </Dropdown.ProfileItem.Item>
    );
}

const DropdownItem: NextComponent<{ children: ReactNode; leftIcon?: JSX.Element; rightIcon?: JSX.Element; onClick: () => void; }> = ({ leftIcon, rightIcon, onClick, ...props}) => {

    return (
        <Dropdown.MenuItem.Item onClick={onClick}>
            {leftIcon && <Dropdown.MenuItem.LeftIcon>{leftIcon}</Dropdown.MenuItem.LeftIcon>}
            { props.children }
            {rightIcon && <Dropdown.MenuItem.RightIcon>{rightIcon}</Dropdown.MenuItem.RightIcon>}
        </Dropdown.MenuItem.Item>
    );
}

// Actual dropdown component
export const DropdownMenu: NextComponent<{ userMenuRef: MutableRefObject<null | HTMLImageElement>; setDropDownOpen: Dispatch<SetStateAction<boolean>>; }> = ({ userMenuRef, setDropDownOpen }) => {
    const user = useUser();
    const { translateString } = useTranslation();
    const router = useRouter();

    const dropDownMenuRef = useRef<HTMLDivElement>(null);

    // Close dropdown if we click outside of it
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // If we click on the user menu return, bc we want the menu to handle the state
            if(userMenuRef.current?.contains(event.target as Node)) return;
            
            if (dropDownMenuRef.current && !dropDownMenuRef.current.contains(event.target as Node)) {
                setDropDownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropDownMenuRef, userMenuRef, setDropDownOpen]);

    // Mutations / Queries
    const signOut = trpc.useMutation('auth.signOut');

    const actions = {
        goToUserProfile: () => {
            //TODO
        },
        goToDashboard: () => {
            //TODO
        },
        goToSettings: () => {
            //TODO
        },
        writeNewArticle: () => {
            //TODO
        },
        viewArticles: () => {
            //TODO
        },
        viewComments: () => {
            //TODO
        },
        createShortlink: () => {
            //TODO (popup / overlay ??)
        },
        goToAdminPanel: () => {
            //TODO
        },
        modifyUser: () => {
            //TODO
        },
        signOut: () => {
            signOut.mutate();
            router.push('/auth/login');
        }
    }

    return (
        <Dropdown.Container ref={dropDownMenuRef}>
            {/* Menuitems for all users */}
            <UserProfileItem onClick={() => actions.goToUserProfile()} profilePictureUrl={user?.photoUrl ?? 'https://avatars.dicebear.com/api/identicon/notavaible.png'}>
                <span>{translateString(dropdownDictionary.profileItem.loggedInAs)} <b>{ user?.name.split(' ')[0] }</b></span>
                <span><RoleDisplay role={user?.role ?? 'USER'} /></span>
            </UserProfileItem>
            <DropdownItem onClick={() => actions.goToDashboard()} leftIcon={<RiDashboard2Fill />}>{translateString(dropdownDictionary.items.goToDashboard)}</DropdownItem>
            <DropdownItem onClick={() => actions.goToSettings()} leftIcon={<RiSettings5Fill />}>{translateString(dropdownDictionary.items.goToSettings)}</DropdownItem>
            <Dropdown.Spacer />

            {/* Menuitems for authors */}
            {isPermitted('AUTHOR', user?.role || 'USER') && <DropdownItem onClick={() => actions.writeNewArticle()} leftIcon={<RiQuillPenFill />}>{translateString(dropdownDictionary.items.newArticle)}</DropdownItem>}
            {isPermitted('AUTHOR', user?.role || 'USER') && <DropdownItem onClick={() => actions.viewArticles()} leftIcon={<RiBookOpenFill />}>{translateString(dropdownDictionary.items.viewArticles)}</DropdownItem>}
            {isPermitted('AUTHOR', user?.role || 'USER') && <DropdownItem onClick={() => actions.viewComments()} leftIcon={<RiHammerFill />}>{translateString(dropdownDictionary.items.viewComments)}</DropdownItem>}
            {isPermitted('AUTHOR', user?.role || 'USER') && <Dropdown.Spacer />}

            {/* Menuitems for Friends */}
            {isPermitted('FRIEND', user?.role || 'USER') && <DropdownItem onClick={() => actions.goToAdminPanel()} leftIcon={<RiLinkM />}>{translateString(dropdownDictionary.items.createShortlink)}</DropdownItem>}
            {isPermitted('FRIEND', user?.role || 'USER') && <Dropdown.Spacer />}

            {/* Menuitems for admins */}
            {isPermitted('ADMIN', user?.role || 'USER') && <DropdownItem onClick={() => actions.goToAdminPanel()} leftIcon={<RiTerminalBoxFill />}>{translateString(dropdownDictionary.items.goToAdminPanel)}</DropdownItem>}
            {isPermitted('ADMIN', user?.role || 'USER') && <DropdownItem onClick={() => actions.modifyUser()} leftIcon={<RiShieldUserFill />}>{translateString(dropdownDictionary.items.modifyUser)}</DropdownItem>}
            {isPermitted('ADMIN', user?.role || 'USER') && <Dropdown.Spacer />}

            {/* Signout Link */}
            <DropdownItem onClick={() => actions.signOut()} leftIcon={<RiDoorOpenFill />}>{translateString(dropdownDictionary.items.signOut)}</DropdownItem>

        </Dropdown.Container>
    );
}