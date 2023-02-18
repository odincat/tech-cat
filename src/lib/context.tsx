import { AppRouterOutput } from "@pages/api/trpc/[trpc]";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { trpc } from "./trpc";
import { NextComponent } from "./types";

type PublicUser = AppRouterOutput["auth"]["getMe"];

export const UserContext = createContext<PublicUser | null>(null);

export const useUser = () => useContext(UserContext);


export const UserProvider: NextComponent<{ children: ReactNode }> = ({ children }) => {
    const dbUser = trpc.auth.getMe.useQuery();

    const [user, setUser] = useState<PublicUser | null>(null);

    useEffect(() => {
        if (dbUser.data) {
            setUser(dbUser.data);
        } else {
            setUser(null);
        }
    }, [dbUser]);


    return <UserContext.Provider value={user}>{ children }</UserContext.Provider>;
}

