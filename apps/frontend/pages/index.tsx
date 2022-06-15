import SignIn from '@components/backend/SignIn';
import MetatagConfig from '@components/MetatagManager';
import type { NextPage } from 'next';
import { TButton } from '@components/ui/Button';

const Home: NextPage = () => {
    return (
        <div>
            <MetatagConfig defaultTitleFormat={true} title='Home' />
            <h1>Hello world!</h1>
            <SignIn />
            <TButton color='blue' href='https://www.google.com/'>
                HI
            </TButton>
        </div>
    );
};

export default Home;
