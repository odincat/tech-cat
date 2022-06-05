import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import { Button } from '@mantine/core';
import MetatagConfig from '@components/metamanager/MetaManager';

const Home: NextPage = () => {
    return (
        <div className={styles.homehero}>
            <MetatagConfig title='Welcome' defaultTitleFormat={true} />
            <img width='100px' src='/tech-cat-logo.png' alt='logo'></img>
            <h1>TechCat Admin backend</h1>
            <a href='https://tech-cat.de'>
                <h3>Go back to main site</h3>
            </a>
            <a href='/authenticate'>
                <Button color='dark'>Login to backend</Button>
            </a>
        </div>
    );
};

export default Home;
