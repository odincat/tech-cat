import SignIn from '@components/backend/SignIn';
import MetatagConfig from '@components/MetatagManager';
import type { NextPage } from 'next';
import { TButton } from '@components/ui/Button';
import { FaTwitterSquare } from 'react-icons/fa';

const Home: NextPage = () => {
    return (
        <div>
            <MetatagConfig defaultTitleFormat={true} title='Home' />
            <h1>Hello world!</h1>
            <SignIn />
            <br></br>
            <br>
            </br>
            <TButton color='blue' leftIcon={<FaTwitterSquare />} leftIconColor='' rightIcon={<FaTwitterSquare />}>
                asdasd
            </TButton>
            <br></br>
            <br />
            <TButton color='blue' href='https://www.google.com/' compact>
                HI
            </TButton>
        </div>
    );
};

export default Home;
