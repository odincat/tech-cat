import Navbar from "@components/Navbar"
import { spotlightActions } from "@components/spotlight"
import { SpotlightProvider } from "@mantine/spotlight"
import { RiSearch2Line } from "react-icons/ri"

const AdminShell = (props: any) => {
    return(
        <SpotlightProvider actions={spotlightActions} searchIcon={<RiSearch2Line />} shortcut="mod + SPACE" searchPlaceholder="Search..." nothingFoundMessage="No results">
            <Navbar />
            {props.children}
        </SpotlightProvider>
    )
};

export default AdminShell;