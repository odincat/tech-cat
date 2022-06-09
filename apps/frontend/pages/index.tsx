import SignIn from '@components/backend/SignIn';
import MetatagConfig from '@components/MetatagManager';
import { css } from '@emotion/react';
import { UserContext } from '@lib/context';
import { useThemed } from '@styling/ThemeProvider';
import { colors } from '@styling/variables';
import type { NextPage } from 'next';
import { useContext } from 'react';
import { GLOBAL_theme, useStore } from '@lib/store';

const Home: NextPage = () => {
    const { user } = useContext(UserContext);

    const themeState = useStore(GLOBAL_theme);

    const theme = useThemed();

    return (
        <div>
            <MetatagConfig defaultTitleFormat={true} title='Home' />
            <h1>Hello world!</h1>
            <SignIn />
        </div>
    );
};

export default Home;
