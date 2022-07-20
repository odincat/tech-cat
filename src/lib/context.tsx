import { User } from "@prisma/client";
import { trpc } from "@server/utils/trpc";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { NextComponent } from "./types";

export const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider: NextComponent<{ children: ReactNode }> = ({ children }) => {
    const dbUser = trpc.useQuery(['auth.getMe']);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (dbUser.data) {
            setUser(dbUser.data);
        } else {
            setUser(null);
        }
    }, [dbUser]);


    return <UserContext.Provider value={user}> { children } </UserContext.Provider>;
}

