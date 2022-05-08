import Navbar from "@components/navbar/Navbar"
import { spotlightActions } from "@lib/spotlight"
import { Alert } from "@mantine/core";
import { SpotlightProvider } from "@mantine/spotlight"
import { RiAlarmWarningFill, RiSearch2Line } from "react-icons/ri"

const AdminShell = (props: any) => {

    return(
        <SpotlightProvider actions={spotlightActions} searchIcon={<RiSearch2Line />} shortcut="mod + SPACE" searchPlaceholder="Search..." nothingFoundMessage="No results">
            <Navbar />
            {props.children}
        </SpotlightProvider>
    )
};

export default AdminShell;