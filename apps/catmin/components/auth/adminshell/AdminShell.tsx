import Navbar from '@components/navbar/Navbar';
import { spotlightActions } from '@lib/spotlight';
import { SpotlightProvider } from '@mantine/spotlight';
import { NotificationsProvider } from '@mantine/notifications';
import { RiSearch2Line } from 'react-icons/ri';
import NextNProgress from 'nextjs-progressbar';

const AdminShell = (props: any) => {
    return (
        <SpotlightProvider
            actions={spotlightActions}
            searchIcon={<RiSearch2Line />}
            shortcut='mod + SPACE'
            searchPlaceholder='Search...'
            nothingFoundMessage='No results'>
            <NotificationsProvider>
                <NextNProgress options={{ showSpinner: false }} />
                <Navbar />
                {props.children}
            </NotificationsProvider>
        </SpotlightProvider>
    );
};

export default AdminShell;
