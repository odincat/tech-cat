import { createContext } from "react";

export interface userDataProperties {
    user?: any;
    userObject: UserObject | null;
    roles: Roles | null;
}

interface UserObject {
    name: string;
    username: string;
    photourl: string;
    postcount: number;
    uid: string;
    bio: string;
}

interface Roles {
    admin: boolean;
    author: boolean;
    beta: boolean;
    dev: boolean;
    trusted: boolean;
}

export const UserContext = createContext<userDataProperties>({ user: null, userObject: null, roles: null });