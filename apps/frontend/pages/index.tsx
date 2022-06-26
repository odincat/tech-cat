import SignIn from '@components/backend/SignIn';
import MetatagConfig from '@components/MetatagManager';
import type { NextPage } from 'next';
import { TButton } from '@components/ui/Button';
import { FaTwitterSquare } from 'react-icons/fa';
import { CookieJar } from '@components/CookieBox';

// export const getStaticProps = async () => {

// }

const Home: NextPage = () => {
    return (
        <div>
            <MetatagConfig defaultTitleFormat={true} title='Home' />
            <h1>Hello world!</h1>
            <SignIn />
            <br></br>
            <br></br>
            <TButton
                color='blue' noEffect>
                asdasd
            </TButton>
            <br></br>
            <br />
            <TButton
                
                color='blue'
                href='https://www.google.com/'
                rightIconColor='yellow'
                leftIcon={<FaTwitterSquare />}
                leftIconColor='yellow'
                rightIcon={<FaTwitterSquare />}>
                HI
            </TButton>
            <CookieJar />
            <a href='#dsa'>sdads</a>
        </div>
    );
};

export default Home;
