import Navbar from "@components/navbar/Navbar"
import CreatePost from "@components/post/createPost/CreatePost";
import { spotlightActions } from "@lib/spotlight"
import { ModalsProvider, useModals } from "@mantine/modals";
import { SpotlightProvider } from "@mantine/spotlight"
import { RiSearch2Line } from "react-icons/ri"

const AdminShell = (props: any) => {
    const modals = useModals();

    return(
        <SpotlightProvider actions={spotlightActions} searchIcon={<RiSearch2Line />} shortcut="mod + SPACE" searchPlaceholder="Search..." nothingFoundMessage="No results">
            <Navbar />
            {props.children}
        </SpotlightProvider>
    )
};

export default AdminShell;