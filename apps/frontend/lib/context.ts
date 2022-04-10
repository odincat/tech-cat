import { createContext } from "react";

export interface userDataProperties {
    user?: any;
}

export const UserContext = createContext<userDataProperties>({ user: null });