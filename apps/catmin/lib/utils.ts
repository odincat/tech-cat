import { useContext } from "react"
import { UserContext } from "./context"

export const useUser = () => {
    return useContext(UserContext);
}

export const toSlug = (string: string) => {
    return encodeURI(string.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, '-').toLowerCase());
}